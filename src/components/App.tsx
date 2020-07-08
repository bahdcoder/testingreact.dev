import React from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import ActiveFilters from './ActiveFilters'
import FiltersOffCanvas from './FiltersOffCanvas'
import styled, { createGlobalStyle } from 'styled-components'

import Home from '../pages/Home'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ActiveFilters />
      <FiltersOffCanvas />
      <Layout>
        <Route path='/' component={Home} />
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
