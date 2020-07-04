import styled from 'styled-components'
import React, { FunctionComponent, ChangeEvent } from 'react'

interface CheckboxPropsInterface {
  label: string
  id: string
  checked?: boolean
  background?: string
  checkMarkBackground?: string
  borderColor?: string
  onChange: (event: ChangeEvent) => void
}

const Checkbox: FunctionComponent<CheckboxPropsInterface> = ({
  label,
  id,
  onChange,
  borderColor,
  checked = false,
  background = '#000',
  checkMarkBackground = '#fff',
}) => (
  <Wrapper data-testid="Checkbox">
    <Input checked={checked} onChange={onChange} type="checkbox" id={id} />
    <Label
      htmlFor={id}
      background={background}
      borderColor={borderColor}
      checkMarkBackground={checkMarkBackground}
    >
      <LabelText>{label}</LabelText>
    </Label>
  </Wrapper>
)

const Wrapper = styled.div``

const LabelText = styled.span`
  display: inline-block;
  margin-left: 16px;
  margin-top: 3px;
  font-size: 14px;
  margin: 3px 0px 16px 16px;
  color: rgb(155, 155, 155);
  transition: 0.25s ease-in-out;
  text-transform: capitalize;
  font-weight: bolder;
`

const Label = styled.label<{
  background: string
  borderColor?: string
  checkMarkBackground: string
}>`
  position: relative;
  display: inline-block;
  padding-left: 20px;
  cursor: pointer;
  width: 100%;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 3px;

    position: absolute;
    top: 0px;
    left: 0px;

    display: inline-block;
    background: ${(props) => props.background};
    box-shadow: none;
    border: 1px solid
      ${(props) => (props.borderColor ? props.borderColor : props.background)};
  }
  &::after {
    content: '';
    width: 11px;
    height: 5px;

    position: absolute;
    left: 4px;
    top: 5px;

    display: inline-block;
    border-left: 2px solid ${(props) => props.checkMarkBackground};
    border-bottom: 2px solid ${(props) => props.checkMarkBackground};
    transform: rotate(-45deg);
    transition: 0.25s ease-in-out;
  }
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  & + ${Label}::after {
    opacity: 0;
  }

  &:checked + ${Label}::after {
    opacity: 1;
  }

  &:checked + ${Label} > span {
    color: rgb(0, 0, 0);
  }

  &:focus + ${Label}::before {
    outline: rgb(59, 153, 252) auto 5px;
  }
`

export default Checkbox
