import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'

import { Axios } from '../helpers/axios'
import { Product } from '../types/Product'
import { FetchedProductsAction } from '../store/actions'
import { FETCHING_PRODUCTS, FETCHED_PRODUCTS } from '../store/constants'

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
