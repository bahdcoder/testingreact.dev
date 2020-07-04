import { useContext } from 'react'

import { FiltersContext } from '../context/filters'

export const useFilters = () => useContext(FiltersContext)

export default useFilters
