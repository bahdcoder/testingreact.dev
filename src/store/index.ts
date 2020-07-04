import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
} from 'redux'

import { StoreState } from '../types/Store'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import products, { productsInitialState } from '../store/reducers/products'

export const initialState: StoreState = {
  products: productsInitialState,
}

export const reducer = combineReducers<StoreState>({
  products,
})

export const createStore = (
  storeReducer = reducer,
  storeInitialState = initialState,
) =>
  createReduxStore(
    storeReducer,
    storeInitialState,
    applyMiddleware(thunk as ThunkMiddleware<StoreState>),
  )

export default createStore(reducer, initialState)
