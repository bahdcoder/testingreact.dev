import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'
import ProductStream from '../../../components/ProductStream'

describe('The <ProductStream /> component', () => {
  const defaultProducts = [
    {
      id: 12,
      name: 'Adidas 1',
      image: './image.png',
      price: 'from $12.99',
      brand: 'Adidas',
      createdAt: '2020-02-11 00:00:00',
      isActive: true,
    },
    {
      id: 13,
      name: 'Nike 1',
      image: './image-1.png',
      price: 'from $42.99',
      brand: 'Nike',
      createdAt: '2020-02-11 00:00:00',
      isActive: true,
    },
  ]

  it('renders a list of Product tiles for each product passed to it', async () => {
    const { getAllByTestId } = render(
      <ProductStream products={defaultProducts as any} />,
    )

    expect(getAllByTestId('ProductTile')).toHaveLength(defaultProducts.length)
  })

  it('has no accessibility violations', async () => {})
})
