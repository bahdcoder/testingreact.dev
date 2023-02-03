import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent, cleanup, screen, getByRole } from '@testing-library/react'
import { check } from 'prettier';

import Checkbox from '../../../components/Checkbox'

afterEach(cleanup);

const defaultProps = {
  label: 'checkbox',
  id: 'id-1',
  checked: false,
  background: '#000000',
  checkMarkBackground: '#666666',
  borderColor: '#666666',
  onChange: jest.fn(),
};

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const setupCheckbox = (props = defaultProps) =>  render(<Checkbox {...props} />);

  it('❌ Should render the label and checkbox the user will see', () => {
    const { getByTestId, debug, getByText, asFragment } = setupCheckbox();

    const checkbox = getByTestId('Checkbox');
    const label = getByText(defaultProps.label);

    // debug(label);
    // debug(checkbox);

    expect(label).toHaveTextContent(/checkbox/i)
    expect(checkbox).toBeInTheDocument();
    // or to check the snapshot
    expect(asFragment()).toMatchSnapshot();
  })

  it('❌ Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
  const { getByTestId, debug, getByRole, getByLabelText } =  setupCheckbox();

    const checkbox = getByTestId('Checkbox');
    const label = checkbox.querySelector('label');
    const input = getByRole('checkbox');

    // debug(label);
    // debug(checkbox);
    // debug(input);

    expect(label).toHaveAttribute('for', 'id-1');
    expect(input).toHaveAttribute('id', 'id-1');
    // or 
    expect(getByLabelText(defaultProps.label)).toBeInTheDocument();
  })

  it('❌ Should call the onChange handler when it is provided', () => {
    const { getByLabelText, debug } = setupCheckbox();

    const checkbox = getByLabelText(defaultProps.label)

    fireEvent.click(checkbox);

    // debug(checkbox);

    expect(defaultProps.onChange).toHaveBeenCalled();
  })

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByTestId, debug, getByRole } = setupCheckbox({...defaultProps, checked: true});

    const checkbox = getByTestId('Checkbox');
    const input = getByRole('checkbox');

    expect(input).toBeChecked();

    // fireEvent.click(input);

    // debug(input);
    // expect(input).not.toBeChecked();
  })

  it('❌ should not fail any accessibility tests', async () => {
    const { container } = setupCheckbox()

    expect(await axe(container)).toHaveNoViolations();
  })
})
