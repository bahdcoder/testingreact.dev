import { Product } from './Product'

export interface ProductsReducerState {
  data: Product[]
  loading: Boolean
  loadingSingleProduct: Boolean
  product: Product | null
  fetchSingleProductError: Boolean
}

export interface CartReducerState {
  products: Product[]
  addingToCart: boolean
  addToCartError: boolean
  cartOpen: boolean
}

export interface StoreState {
  products: ProductsReducerState
  cart: CartReducerState
}
