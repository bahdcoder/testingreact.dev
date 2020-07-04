import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  it('❌ Should render the label and checkbox the user will see', () => {})

  it('❌ Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {})

  it('❌ Should call the onChange handler when it is provided', () => {})

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {})

  it('❌ should not fail any accessibility tests', async () => {})
})
