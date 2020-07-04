import React, { FC } from 'react'
import styled from 'styled-components'
import { Product } from '../types/Product'
import { BASE_URL } from '../helpers/constants'

const ProductTile: FC<Product> = ({ name, price, image }) => {
  return (
    <Wrapper data-testid="ProductTile">
      <ImageWrapper>
        {image && (
          <Image
            alt={name}
            src={`${BASE_URL}${image}`}
            data-testid="ProductTileImage"
          />
        )}
      </ImageWrapper>
      <Content>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: rgb(242, 242, 242);
  height: 0px;
  padding-top: 133%;
  border-radius: 2px;
  overflow: hidden;
`

const Image = styled.img`
  position: absolute;
  height: auto;
  top: 5%;
  left: 5%;
  right: 5%;
  bottom: 5%;
  max-height: 90%;
  max-width: 90%;
  margin: auto;
  object-position: center center;
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const Name = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const Price = styled.div`
  font-size: 12px;
`

const Content = styled.div`
  line-height: 1.4em;
  padding: 15px;
`

export default ProductTile
