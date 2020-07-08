import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'

import store from './store'
import App from './components/App'
import { FiltersWrapper } from './components/FiltersWrapper'

ReactDOM.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <FiltersWrapper>
        <App />
      </FiltersWrapper>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
)
