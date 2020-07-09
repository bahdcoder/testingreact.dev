import React from 'react'
import { render } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {
  const defaultProduct = {
    id: 12,
    name: 'Example product name',
    image: '/image.png',
    price: 'from $12.99',
    brand: 'Adidas',
    createdAt: '2020-02-11 00:00:00',
    isActive: true,
  }

  it('renders a product tile with name, image and price', () => {
    const { getByText, getByAltText } = render(
      <ProductTile {...(defaultProduct as any)} />,
    )

    expect(getByText(defaultProduct.name)).toBeInTheDocument()
    expect(getByText(defaultProduct.price)).toBeInTheDocument()
    expect(getByAltText(defaultProduct.name)).toBeInTheDocument()
  })

  it('renders a product tile with name and price only', () => {
    const { queryByTestId } = render(
      <ProductTile
        {...({
          ...defaultProduct,
          image: undefined,
        } as any)}
      />,
    )

    expect(queryByTestId('ProductTileImage')).toBeNull()
  })
})
