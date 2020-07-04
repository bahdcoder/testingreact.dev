import { Reducer } from 'redux'
import { ProductActions } from '../../store/actions'
import { ProductsReducerState } from '../../types/Store'
import { FETCHING_PRODUCTS, FETCHED_PRODUCTS } from '../../store/constants'

export const productsInitialState: ProductsReducerState = {
  data: [],
  loading: false,
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

  return state
}

export default productsReducer
