import React, { FC, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { useSelector, useDispatch } from 'react-redux'

import ProductStream from '../components/ProductStream'

import { StoreState } from '../types/Store'
import useFilters from '../hooks/useFilters'
import { fetchProducts } from '../store/action-creators'

const Home: FC = () => {
  const dispatch = useDispatch()
  const { search } = useFilters()

  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: debouncedSearch,
      }),
    )
  }, [dispatch, debouncedSearch])

  const products = useSelector<StoreState, StoreState['products']>(
    (state) => state.products,
  )

  return <ProductStream products={products.data} />
}

export default Home
