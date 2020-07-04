export interface FilterState {
  showingFilters: boolean
  search: string
  debouncedSearch: string
}

export type FiltersContextInterface = FilterState & {
  toggleShowingFilters: () => void
  setSearch: (search: string) => void
}

export const LOCAL_STORAGE_KEYS = {
  APPLIED_ATTRIBUTES: 'APPLIED_ATTRIBUTES',
}
