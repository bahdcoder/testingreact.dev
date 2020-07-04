import React from 'react'
import { FiltersContextInterface } from '../types/Filters'

const defaultFilterContext: FiltersContextInterface = {
  search: '',
  showingFilters: false,
  debouncedSearch: '',
  setSearch: () => {},
  toggleShowingFilters: () => {},
}

export const FiltersContext = React.createContext<FiltersContextInterface>(
  defaultFilterContext,
)
