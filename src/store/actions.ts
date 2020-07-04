import { Action } from 'redux'
import { Product } from '../types/Product'

export interface FetchProductAction extends Action<'FETCHING_PRODUCTS'> {}

export interface FetchedProductsAction extends Action<'FETCHED_PRODUCTS'> {
  products: Product[]
}

export type ProductActions = FetchProductAction | FetchedProductsAction
