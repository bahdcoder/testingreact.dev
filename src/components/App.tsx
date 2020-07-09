import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Cart from './Cart'
import Header from './Header'
import ActiveFilters from './ActiveFilters'
import FiltersOffCanvas from './FiltersOffCanvas'
import styled, { createGlobalStyle } from 'styled-components'

import Home from '../pages/Home'
import Product from '../pages/Product'

const App = () => {
  const { pathname } = useLocation()

  return (
    <>
      <GlobalStyle />
      <Header />
      <Cart />

      {pathname === '/' ? (
        <>
          <ActiveFilters />
          <FiltersOffCanvas />
        </>
      ) : null}
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:product" component={Product} />
        </Switch>
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
