import { Reducer } from 'redux'
import { ProductActions } from '../../store/actions'
import { ProductsReducerState } from '../../types/Store'
import {
  FETCHING_PRODUCTS,
  FETCHED_PRODUCTS,
  FETCHED_PRODUCT,
  FETCHING_PRODUCT,
  ADDED_TO_CART,
  ADDING_TO_CART,
} from '../../store/constants'

export const productsInitialState: ProductsReducerState = {
  data: [],
  loading: false,
  loadingSingleProduct: false,
  product: null,
  fetchSingleProductError: false,
}

const productsReducer: Reducer<ProductsReducerState, ProductActions> = (
  state = productsInitialState,
  action,
) => {
  if (action.type === FETCHING_PRODUCTS) {
    return {
      ...state,
      loading: true,
    }
  }

  if (action.type === FETCHED_PRODUCTS) {
    return {
      ...state,
      loading: false,
      data: action.products,
    }
  }

  if (action.type === FETCHING_PRODUCT) {
    return {
      ...state,
      loadingSingleProduct: true,
    }
  }

  if (action.type === FETCHED_PRODUCT) {
    return {
      ...state,
      loadingSingleProduct: false,
      product: action.product,
      fetchSingleProductError: action.fetchSingleProductError,
    }
  }

  return state
}

export default productsReducer
