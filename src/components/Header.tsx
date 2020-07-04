import React from 'react'
import styled from 'styled-components'

// hooks
import { useFilters } from '../hooks/useFilters'

const Header = () => {
  const { toggleShowingFilters } = useFilters()

  return (
    <Wrapper>
      <SpanHiddenOnMobile />
      <PageTitle>
        TESTING <span />
        REACT.DEV
      </PageTitle>

      <FilterButton data-testid="FilterButton" onClick={toggleShowingFilters}>
        Filter
      </FilterButton>
    </Wrapper>
  )
}

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
`

const FilterButton = styled.button`
  position: relative;
  height: 33px;
  font-size: 12px;
  font-weight: 500;
  padding: 0px 25px;
  border-radius: 999px;
  border-width: 1px;
  background-color: white;
  cursor: pointer;
  border-style: solid;
  border-color: rgb(229, 229, 229);
  border-image: initial;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`

const SpanHiddenOnMobile = styled.span`
  display: none;
  @media (min-width: 1024px) {
    display: inline;
  }
`

const Wrapper = styled.header`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
`

export default Header
