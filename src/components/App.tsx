import React, { useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useSelector, useDispatch } from 'react-redux'

import Header from './Header'
import ActiveFilters from './ActiveFilters'
import ProductStream from './ProductStream'
import FiltersOffCanvas from './FiltersOffCanvas'
import styled, { createGlobalStyle } from 'styled-components'

import { StoreState } from '../types/Store'
import useFilters from '../hooks/useFilters'
import { fetchProducts } from '../store/action-creators'

const App = () => {
  const dispatch = useDispatch()
  const { search } = useFilters()

  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: debouncedSearch,
      }),
    )
  }, [dispatch, debouncedSearch])

  const products = useSelector<StoreState, StoreState['products']>(
    (state) => state.products,
  )

  return (
    <>
      <GlobalStyle />
      <Header />
      <ActiveFilters />
      <FiltersOffCanvas />
      <Layout>
        <ProductStream products={products.data} />
      </Layout>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Playfair Display', Arial, Helvetica, sans-serif;
  }

  body {
    font-family: 'Playfair Display', Arial, Helvetica, sans-serif;
  }
`

const Layout = styled.article`
  padding: 0 20px;
`

export default App
