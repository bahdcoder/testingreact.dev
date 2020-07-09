import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchSingleProduct,
  addProductToCart,
  removeProductFromCart,
} from '../store/action-creators'
import { useRouteMatch, Link, useHistory, Redirect } from 'react-router-dom'
import { StoreState } from '../types/Store'
import styled from 'styled-components'
import { Image, ImageWrapper } from '../components/ProductTile'
import { BASE_URL } from '../helpers/constants'
import { FilterButton as AddToCartButton } from '../components/Header'
import { FETCHED_PRODUCT } from '../store/constants'

const Product: FC = () => {
  const dispatch = useDispatch()
  const { params } = useRouteMatch<{
    product: string
  }>()

  const { product, fetchSingleProductError } = useSelector<
    StoreState,
    StoreState['products']
  >((state) => state.products)

  const { products } = useSelector<StoreState, StoreState['cart']>(
    (state) => state.cart,
  )

  const addToCart = () => {
    dispatch(addProductToCart(product.id.toString()))
  }

  const removeFromCart = () => {
    dispatch(removeProductFromCart(product.id.toString()))
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(params.product))

    return () =>
      dispatch({
        type: FETCHED_PRODUCT,
        product: null,
        fetchSingleProductError: false,
      })
  }, [params.product])

  const inCart = products.find(
    (productInCart) => params.product === productInCart.id.toString(),
  )

  return (
    <>
      {product ? (
        <Wrapper>
          <ActionsWrapper>
            <Link to="/">
              <GoBack>Go Back</GoBack>
            </Link>

            <Price>{product.price}</Price>

            <AddToCartButton onClick={inCart ? removeFromCart : addToCart}>
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </AddToCartButton>
          </ActionsWrapper>
          <ImageWrapper>
            {product.image && (
              <Image
                alt={product.name}
                src={`${BASE_URL}${product.image}`}
              ></Image>
            )}
          </ImageWrapper>
        </Wrapper>
      ) : fetchSingleProductError ? (
        <Redirect to="/" />
      ) : null}
    </>
  )
}

const Price = styled.p`
  font-weight: bolder;
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
  margin-top: 30px;
`

const GoBack = styled.button`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
`

export default Product
