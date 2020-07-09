import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'

import { Axios } from '../helpers/axios'
import { Product } from '../types/Product'
import {
  FetchedProductsAction,
  FetchedProductAction,
  AddedToCartAction,
} from '../store/actions'
import {
  FETCHING_PRODUCTS,
  FETCHED_PRODUCTS,
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  ADDING_TO_CART,
  ADDED_TO_CART,
  FETCHING_CART,
  TOGGLE_CART_OPEN,
  REMOVING_FROM_CART,
} from '../store/constants'

// ThunkAction<(1), (2), (3), (4)>
// (1) The return value of the internal async function that will be returned by this thunk
// (2) The type of data being fired in the last action
// (3) The type of the extra arguments passed to redux
// (4) The last action to be dispatched.
export const fetchProducts = ({
  search = '',
}: {
  search: string
}): ThunkAction<
  Promise<FetchedProductsAction>,
  Product[],
  undefined,
  FetchedProductsAction
> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: FETCHING_PRODUCTS,
    })

    return Axios.get(`products?search=${search}`).then(
      ({ data }: AxiosResponse<Product[]>) =>
        dispatch({
          type: FETCHED_PRODUCTS,
          products: data,
        }),
    )
  }
}

export const fetchSingleProduct = (
  id: string,
): ThunkAction<
  Promise<FetchedProductAction>,
  Product,
  undefined,
  FetchedProductAction
> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: FETCHING_PRODUCT,
    })

    return Axios.get(`products/${id}`)
      .then(({ data }: AxiosResponse<Product>) => {
        return dispatch({
          type: FETCHED_PRODUCT,
          product: data,
        })
      })
      .catch((error) => {
        return dispatch({
          type: FETCHED_PRODUCT,
          product: null,
          fetchSingleProductError: true,
        })
      })
  }
}

export const addProductToCart = (
  id: string,
): ThunkAction<
  Promise<AddedToCartAction>,
  Product,
  undefined,
  AddedToCartAction
> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADDING_TO_CART,
    })

    return Axios.post(`cart/${id}`)
      .then(({ data }: AxiosResponse<Product[]>) => {
        return dispatch({
          type: ADDED_TO_CART,
          products: data,
        })
      })
      .catch((error) => {
        return dispatch({
          type: ADDED_TO_CART,
          addToCartError: true,
        })
      })
  }
}

export const removeProductFromCart = (
  id: string,
): ThunkAction<
  Promise<AddedToCartAction>,
  Product,
  undefined,
  AddedToCartAction
> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVING_FROM_CART,
    })

    return Axios.delete(`cart/${id}`)
      .then(({ data }: AxiosResponse<Product[]>) => {
        return dispatch({
          type: ADDED_TO_CART,
          products: data,
        })
      })
      .catch((error) => {
        return dispatch({
          type: ADDED_TO_CART,
          addToCartError: true,
        })
      })
  }
}

export const getProductsInCart = (): ThunkAction<
  Promise<AddedToCartAction>,
  Product,
  undefined,
  AddedToCartAction
> => {
  return (dispatch: Dispatch) => {
    return Axios.get(`cart`)
      .then(({ data }: AxiosResponse<Product[]>) => {
        return dispatch({
          type: ADDED_TO_CART,
          products: data,
        })
      })
      .catch((error) => {
        return dispatch({
          type: ADDED_TO_CART,
          addToCartError: true,
        })
      })
  }
}

export const toggleCartOpen = () => ({
  type: TOGGLE_CART_OPEN,
})
