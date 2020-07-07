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
      data: [{
        id: 1,
        name: 'test name 1',
        image: 'image-1.png',
        price: 'from $22.99'
      }, {
        id: 2,
        name: 'test name 2',
        image: 'image-2.png',
        price: 'from $29.99'
      }]
    })
    const { findAllByTestId } = setupApp()

    expect(await findAllByTestId('ProductTile')).toHaveLength(2)
  })

  test('❌ it can open and close the filters panel', async () => {})

  test('❌ it can search products as user types in the search field', async () => {})
})
