import React from 'react'
import ReactDOM from 'react-dom'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'
import { check } from 'prettier'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const defaultCheckboxProps = {
    label: 'TEST_CHECKBOX_LABEL',
    id: 'TEST_CHECKBOX_ID',
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
    checked: false,
  }

  const setupCheckbox = () => render(
    <Checkbox {...defaultCheckboxProps} />,
  )
  it('Should render the label and checkbox the user will see', () => {
    const { asFragment } = setupCheckbox()

      expect(asFragment()).toMatchSnapshot()
  })

  it('Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setupCheckbox()

    expect(getByLabelText(defaultCheckboxProps.label)).toBeInTheDocument()
  })

  it(' Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckbox()

    const checkbox = getByLabelText(defaultCheckboxProps.label)

    fireEvent.click(checkbox)

    expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {})

  it('❌ should not fail any accessibility tests', async () => {})
})
