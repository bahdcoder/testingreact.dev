import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'

import Header from '../../../components/Header'
import { FiltersContext } from '../../../context/filters'
import { createStore } from '../../../store'

describe('The Header component', () => {
  const defaultContext = {
    toggleShowingFilters: jest.fn(),
  }

  const setupHeader = (value = defaultContext, routerProps = {
    initialEntries: ['/', '/products/1'],
    initialIndex: 0
  }) =>
    render(
      <FiltersContext.Provider value={...value as any}>
        <StoreProvider store={createStore()}>
          <MemoryRouter {...routerProps}>
            <Header />
          </MemoryRouter>
        </StoreProvider>
      </FiltersContext.Provider>,
    )
  it('renders header correctly', () => {
    const { asFragment } = setupHeader()

    expect(asFragment()).toMatchSnapshot()
  })

  it('toggles the filter open when the Filter button is clicked', () => {
    const { getByText } = setupHeader()

    const filterButton = getByText(/filter/i)

    fireEvent.click(filterButton)

    expect(defaultContext.toggleShowingFilters).toHaveBeenCalled()
  })

  it('shows the filter button only on the home page', () => {
    const { queryByText } = setupHeader(undefined, {
      initialEntries: ['/', '/products/1'],
      initialIndex: 1
    })

    expect(queryByText(/filter/i)).toBeNull()
  })
})
