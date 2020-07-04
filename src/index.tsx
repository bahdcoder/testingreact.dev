import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'

import store from './store'
import App from './components/App'
import { FiltersWrapper } from './components/FiltersWrapper'

ReactDOM.render(
  <StoreProvider store={store}>
    <FiltersWrapper>
      <App />
    </FiltersWrapper>
  </StoreProvider>,
  document.getElementById('root'),
)
