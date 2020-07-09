import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

// hooks
import { useFilters } from '../hooks/useFilters'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCartOpen } from '../store/action-creators'
import { StoreState } from '../types/Store'

const Header = () => {
  const { toggleShowingFilters } = useFilters()
  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const { products } = useSelector<StoreState, StoreState['cart']>(
    (state) => state.cart,
  )

  return (
    <Wrapper>
      <SpanHiddenOnMobile />
      <PageTitle>
        TESTING <span />
        REACT.DEV
      </PageTitle>

      <div>
        {pathname === '/' ? (
          <FilterButton
            data-testid="FilterButton"
            onClick={toggleShowingFilters}
          >
            Filter
          </FilterButton>
        ) : null}
        <CartButton data-testid='CartButton' onClick={() => dispatch(toggleCartOpen())}>
          Cart ({products.length})
        </CartButton>
      </div>
    </Wrapper>
  )
}

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
`

export const FilterButton = styled.button`
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

const CartButton = styled(FilterButton)`
  margin-left: 10px;
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
