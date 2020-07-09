import { Action } from 'redux'
import { Product } from '../types/Product'
import {
  FETCHING_PRODUCTS,
  FETCHED_PRODUCTS,
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  ADDING_TO_CART,
  ADDED_TO_CART,
  TOGGLE_CART_OPEN,
} from './constants'

export interface FetchProductAction extends Action<typeof FETCHING_PRODUCTS> {}

export interface FetchedProductsAction extends Action<typeof FETCHED_PRODUCTS> {
  products: Product[]
}

export interface FetchedProductAction extends Action<typeof FETCHED_PRODUCT> {
  product?: Product
  fetchSingleProductError?: Boolean
}

export interface FetchingProductAction
  extends Action<typeof FETCHING_PRODUCT> {}

export interface AddingToCartAction extends Action<typeof ADDING_TO_CART> {}

export interface AddedToCartAction extends Action<typeof ADDED_TO_CART> {
  products?: Product[]
  addToCartError?: boolean
}

export interface ToggleCartOpen extends Action<typeof TOGGLE_CART_OPEN> {}

export type ProductActions =
  | FetchProductAction
  | FetchedProductsAction
  | FetchingProductAction
  | FetchedProductAction

export type CartActions =
  | AddingToCartAction
  | AddedToCartAction
  | ToggleCartOpen
