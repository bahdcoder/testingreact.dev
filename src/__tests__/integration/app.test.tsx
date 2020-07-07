import React from 'react'
import { Axios } from '../../helpers/axios'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { build, fake } from '@jackfranklin/test-data-bot'

import App from '../../components/App'
import { createStore } from '../../store'
import { FiltersWrapper } from '../../components/FiltersWrapper'

jest.mock('../../helpers/axios')

const mockAxios = Axios as any

const productBuilder = build('Product', {
  fields: {
    id: fake(f => f.random.number()),
    image: fake(f => f.image.imageUrl()),
    name: fake(f => f.lorem.words()),
    price: fake(f => `from $${f.random.number(100)}`)
  }
})

describe('The app ', () => {
  const setupApp = () => render(
    <StoreProvider store={createStore()}>
      <FiltersWrapper>
        <App />
      </FiltersWrapper>
    </StoreProvider>
  )

  test('it fetches and renders all products on the page', async () => {
    mockAxios.get.mockResolvedValue({
      data: [productBuilder(), productBuilder()]
    })
    const { findAllByTestId } = setupApp()

    expect(await findAllByTestId('ProductTile')).toHaveLength(2)
  })

  test('❌ it can open and close the filters panel', async () => {})

  test('❌ it can search products as user types in the search field', async () => {})
})
