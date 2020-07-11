import React from 'react'
import Modal from 'react-modal'
import { Axios } from '../../helpers/axios'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, act, waitFor, findByText } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { productBuilder } from '../utils'

import App from '../../components/App'
import { createStore } from '../../store'
import { FiltersWrapper } from '../../components/FiltersWrapper'
import { debug } from 'console'

jest.mock('../../helpers/axios')

const mockAxios = Axios as any

describe('The app ', () => {
  const setupApp = (routerProps = {
    initialEntries: ['/', '/products/1'],
    initialIndex: 0
  }) =>
    render(
      <StoreProvider store={createStore()}>
        <MemoryRouter {...routerProps}>
          <FiltersWrapper>
            <App />
          </FiltersWrapper>
        </MemoryRouter>
      </StoreProvider>,
    )

  afterEach(() => jest.clearAllMocks())

  test('it fetches and renders all products on the page', async () => {
    mockAxios.get.mockResolvedValue({
      data: [productBuilder(), productBuilder()],
    })
    const { findAllByTestId } = setupApp()

    expect(await findAllByTestId('ProductTile')).toHaveLength(2)
  })

  test('it can open and close the filters panel', async () => {
    const { getByText, queryByText } = setupApp()

    const filterButton = getByText(/filter/i)

    expect(queryByText(/reset to defaults/i)).not.toBeInTheDocument()

    fireEvent.click(filterButton)

    expect(queryByText(/reset to defaults/i)).toBeInTheDocument()

    fireEvent.click(getByText(/view results/i))

    expect(queryByText(/reset to defaults/i)).not.toBeInTheDocument()
    expect(queryByText(/view results/i)).not.toBeInTheDocument()
  })

  test('it can search products as user types in the search field', async () => {
    jest.useFakeTimers()
    mockAxios.get
      // fetches the shopping cart items
      .mockResolvedValueOnce({
        data: [productBuilder()]
      })

      // fetches all the products on home page
      .mockResolvedValueOnce({
        data: [
          productBuilder(),
          productBuilder(),
          productBuilder(),
          productBuilder(),
          productBuilder(),
        ],
      })

      // searches products
      .mockResolvedValueOnce({
        data: [productBuilder(), productBuilder()],
      })
    const { findAllByTestId, getByText, getByPlaceholderText } = setupApp()

    expect(await findAllByTestId('ProductTile')).toHaveLength(5)

    fireEvent.click(getByText(/filter/i))

    const searchBox = getByPlaceholderText(/largo/i)

    fireEvent.change(searchBox, {
      target: {
        value: 'searching',
      },
    })

    act(() => {
      jest.runAllTimers()
    })

    // shopping cart, products home page, search products
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(3))

    expect(await findAllByTestId('ProductTile')).toHaveLength(2)
  })

  test('it can navigate to the single product page', async () => {
    const product = productBuilder()

    mockAxios.get.mockImplementation((url: string) => {
      return new Promise(resolve => {

        if (url === `products/${product.id}`) {
          return resolve({
            data: product
          })
        }

        return resolve({
          data: [product]
        })
      })
    })

    const { findByTestId, findByText } = setupApp()

    fireEvent.click(await findByTestId('ProductTileLink'))

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(3))
    expect(await findByText(product.price)).toBeInTheDocument()
  })

  test('❌it can add a product to cart', async () => {
    const [product1, product2, product3] = [productBuilder(), productBuilder(), productBuilder()]

    mockAxios.get.mockImplementation((url: string) => new Promise(resolve => {
      if (url === 'cart') {
        return resolve({
          data: []
        })
      }

      if (url === `products/${product1.id}`) {
        return resolve({
          data: product1
        })
      }

      return resolve({
        data: [product1, product2, product3]
      })
    }))

    mockAxios.post.mockResolvedValue({
      data: [product1]
    })

    const { findByTestId, findByText, getByText } = setupApp({
      initialEntries: ['/', `/products/${product1.id}`],
      initialIndex: 1
    })

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2))

    await findByText(product1.price)

    fireEvent.click(getByText(/add to cart/i))

    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1))

    expect(getByText(/remove from cart/i)).toBeInTheDocument()

    expect(await findByTestId('CartButton')).toHaveTextContent('Cart (1)')
  })

  test('❌it can remove a product from cart', async () => {})
 
  test('it can go through and complete the checkout flow', async () => {
    Modal.setAppElement(document.createElement('div'))
    const [product1, product2, product3] = [{
      ...productBuilder(),
      priceUnformatted: 4000,
    }, {
      ...productBuilder(),
      priceUnformatted: 4000,
    }, productBuilder()]

    mockAxios.get.mockImplementation((url: string) => new Promise(resolve => {
      if (url === 'cart') {
        return resolve({
          data: [product1, product2]
        })
      }

      return resolve({
        data: [product1, product2, product3]
      })
    }))

    mockAxios.post.mockResolvedValue({
      data: {
        message: 'Success.'
      }
    })

    const { getByTestId, getByText, findByTestId } = setupApp()

    fireEvent.click(getByTestId('CartButton'))

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2))

    const checkoutButton = getByTestId('CheckoutButton')

    expect(checkoutButton).toHaveTextContent('Checkout $80')

    const TEST_STRIPE_TOKEN = 'TEST_STRIPE_TOKEN'

    const createToken = jest.fn().mockResolvedValue({
      error: null,
      token: TEST_STRIPE_TOKEN
    })

    window.Stripe = jest.fn().mockReturnValue({
      createToken,
      elements: jest.fn().mockReturnValue({
        create: jest.fn().mockReturnValue({
          mount: jest.fn(),
          on: jest.fn(),
          destroy: jest.fn(),
          update: jest.fn()
        })
      })
    }) as any
    
    fireEvent.click(checkoutButton)

    expect(getByText('Checkout $80')).toBeInTheDocument()

    fireEvent.click(getByTestId('PlaceOrderButton'))

    await waitFor(() => expect(createToken).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(mockAxios.post).toHaveBeenCalledWith('checkout', {
      token: TEST_STRIPE_TOKEN
    }))

    expect(await findByTestId('CartButton')).toHaveTextContent('Cart (0)')
    expect(await findByTestId('FilterButton')).toBeInTheDocument()
  })
})
