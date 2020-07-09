import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  it('should render all children passed to it', () => {
    const { getByTestId } = render(
      <FiltersWrapper>
        <p data-testid="TestParagraph"></p>
      </FiltersWrapper>,
    )

    expect(getByTestId('TestParagraph')).toBeInTheDocument()
  })

  const hideMessage = 'HIDE FILTERS'
  const showMessage = 'SHOWING FILTERS'

  const setupFiltersWrapper = () =>
    render(
      <FiltersWrapper>
        <FiltersContext.Consumer>
          {({ showingFilters, toggleShowingFilters }) => {
            return (
              <button onClick={toggleShowingFilters}>
                {showingFilters ? showMessage : hideMessage}
              </button>
            )
          }}
        </FiltersContext.Consumer>
      </FiltersWrapper>,
    )

  it('should update the filters context with correct state values', () => {
    const { getByText } = setupFiltersWrapper()

    expect(getByText(hideMessage)).toBeInTheDocument()

    fireEvent.click(getByText(hideMessage))

    expect(getByText(showMessage)).toBeInTheDocument()
  })

  it('should update the body style to prevent scrolling when filter is toggled', () => {
    const { getByText } = setupFiltersWrapper()

    fireEvent.click(getByText(hideMessage))

    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(getByText(showMessage))
    expect(document.body.style.overflow).toBe('scroll')
  })
})
