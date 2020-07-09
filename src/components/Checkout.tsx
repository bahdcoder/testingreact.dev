import React, { FC, useState } from 'react'
import { Axios } from '../helpers/axios'
import {
  StripeProvider,
  Elements,
  CardElement,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements'

import { FilterButton as CheckoutButton } from './Header'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { AxiosError } from 'axios'
import { ADDED_TO_CART, TOGGLE_CART_OPEN } from '../store/constants'
import { useHistory } from 'react-router-dom'

interface CheckoutFormWrapperProps {
  total: number
}

const CheckoutFormWrapper: FC<CheckoutFormWrapperProps> = ({ total }) => {
  return (
    <StripeProvider apiKey="pk_test_ut17cWyO8AIQNoCRzByQZKCN00i2y3fQIB">
      <Elements>
        <InjectedCheckoutForm total={total} />
      </Elements>
    </StripeProvider>
  )
}

interface CheckoutFormProps {
  total: number
}

const CheckoutForm: FC<
  CheckoutFormProps & ReactStripeElements.InjectedStripeProps
> = ({ stripe }) => {
  const [working, setWorking] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const checkout = () => {
    setWorking(true)

    stripe.createToken().then(({ token, error }) => {
      if (error) {
        setWorking(false)
        setError(error.message)

        return
      }

      Axios.post('checkout', {
        token,
      })
        .then(() => {
          dispatch({
            type: ADDED_TO_CART,
            products: [],
          })

          dispatch({
            type: TOGGLE_CART_OPEN,
          })

          push('/')
        })
        .catch((error: AxiosError) => {
          setError(
            error.response.data.message ||
              'Something went wrong with your payment.',
          )
          setWorking(false)
        })
    })
  }

  return (
    <>
      <CardElementWrapper>
        <CardElement />
      </CardElementWrapper>
      <CheckoutButtonWrapper>
        <CheckoutButton disabled={working} onClick={checkout}>
          {working ? 'Placing Order' : 'Place Order'}
        </CheckoutButton>
      </CheckoutButtonWrapper>
    </>
  )
}

const CheckoutButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardElementWrapper = styled.div`
  margin: 25px 0px;
  padding: 15px;
`

const InjectedCheckoutForm = injectStripe<CheckoutFormProps>(CheckoutForm)

export default CheckoutFormWrapper
