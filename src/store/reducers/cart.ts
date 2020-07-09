import { Reducer } from 'redux'
import { CartActions } from '../../store/actions'
import { CartReducerState } from '../../types/Store'
import {
  ADDED_TO_CART,
  ADDING_TO_CART,
  TOGGLE_CART_OPEN,
} from '../../store/constants'

export const cartInitialState: CartReducerState = {
  products: [],
  addingToCart: false,
  addToCartError: false,
  cartOpen: false,
}

const cartReducer: Reducer<CartReducerState, CartActions> = (
  state = cartInitialState,
  action,
) => {
  if (action.type === ADDING_TO_CART)
    return {
      ...state,
      addingToCart: true,
    }

  if (action.type === ADDED_TO_CART)
    return {
      ...state,
      addingToCart: false,
      addToCartError: action.addToCartError || false,
      products: action.products || state.products,
    }

  if (action.type === TOGGLE_CART_OPEN)
    return {
      ...state,
      cartOpen: !state.cartOpen,
    }

  return state
}

export default cartReducer
