import { useDebounce } from 'use-debounce'
import React, { useState, FC, PropsWithChildren } from 'react'

import { FilterState } from '../types/Filters'
import { FiltersContext } from '../context/filters'

export const FiltersWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [showingFilters, setShowingFilters] = useState<
    FilterState['showingFilters']
  >(false)
  const [search, setSearch] = useState<string>('')

  const [debouncedSearch] = useDebounce(search, 500)

  const toggleBodyScrollBehaviour = () => {
    if (showingFilters) {
      document.body.style.overflow = 'scroll'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        search,
        setSearch,
        showingFilters,
        debouncedSearch,
        toggleShowingFilters: () => {
          toggleBodyScrollBehaviour()

          setShowingFilters((showing) => !showing)
        },
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
