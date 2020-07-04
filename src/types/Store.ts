import { Product } from './Product'

export interface ProductsReducerState {
  data: Product[]
  loading: Boolean
}

export interface StoreState {
  products: ProductsReducerState
}
