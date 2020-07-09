import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '../types/Store'
import {
  getProductsInCart,
  toggleCartOpen,
  removeProductFromCart,
} from '../store/action-creators'
import styled from 'styled-components'
import CheckoutForm from './Checkout'
import { FilterButton as RemoveFromCartButton } from '../components/Header'

Modal.setAppElement(document.getElementById('cart'))

const Cart = () => {
  const [checkingOut, setCheckingOut] = useState<boolean>(false)
  const { cartOpen, products } = useSelector<StoreState, StoreState['cart']>(
    (state) => state.cart,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsInCart())
  }, [])

  const cartTotal = products.reduce(
    (total, product) => product.priceUnformatted + total,
    0,
  )

  return (
    <Modal
      isOpen={cartOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '30%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      onRequestClose={() => {
        setCheckingOut(false)
        dispatch(toggleCartOpen())
      }}
    >
      <CartHeading>
        {checkingOut ? `Checkout $${cartTotal / 100}` : 'Cart'}
      </CartHeading>

      {checkingOut ? (
        <CheckoutForm total={cartTotal} />
      ) : (
        <>
          {products.length === 0 ? (
            <EmptyCart>Your cart is empty.</EmptyCart>
          ) : (
            <>
              <ProductsWrapper>
                {products.map((product) => (
                  <SingleProductWrapper key={product.id}>
                    <span>
                      {product.name} ({product.price})
                    </span>

                    <RemoveFromCartButton
                      onClick={() =>
                        dispatch(removeProductFromCart(product.id.toString()))
                      }
                    >
                      Remove from Cart
                    </RemoveFromCartButton>
                  </SingleProductWrapper>
                ))}
              </ProductsWrapper>

              <CheckoutButtonWrapper>
                <CheckoutButton onClick={() => setCheckingOut(true)}>
                  Checkout ${cartTotal / 100}
                </CheckoutButton>
              </CheckoutButtonWrapper>
            </>
          )}
        </>
      )}
    </Modal>
  )
}

const CheckoutButton = styled(RemoveFromCartButton)``

const CheckoutButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`

const CartHeading = styled.h1`
  text-align: center;
`

const ProductsWrapper = styled.div`
  margin-bottom: 15px;
`

const SingleProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const EmptyCart = styled.p`
  text-align: center;
  margin-top: 10px;
`

export default Cart
