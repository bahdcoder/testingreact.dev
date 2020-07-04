import React, { useRef, useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import useOutsideClick from '../../../hooks/useOutsideClick'

describe('The useOutsideClick hook', () => {
  // This test is important if you are going to be creating libraries in future.
  // Very important to make sure the component is used the right way.
  // This test can be migrated in future, if the useOutsideClick
  // hook is moved to an external library at your company.
  it('❌ calls the outside click handler when an outside click is initiated', () => {})

  it('❌ cleans up the event listeners after component is unmounted', () => {})
})
