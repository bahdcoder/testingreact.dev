import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import { StoreState } from '../types/Store'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import cart, { cartInitialState } from '../store/reducers/cart'
import products, { productsInitialState } from '../store/reducers/products'

export const initialState: StoreState = {
  products: productsInitialState,
  cart: cartInitialState,
}

export const reducer = combineReducers<StoreState>({
  products,
  cart,
})

const middleware = [
  applyMiddleware(thunk as ThunkMiddleware<StoreState>),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
].filter(Boolean)

export const createStore = (
  storeReducer = reducer,
  storeInitialState = initialState,
) =>
  createReduxStore(
    storeReducer,
    storeInitialState,
    compose(...middleware),
  )

export default createStore(reducer, initialState)
