import React from 'react'
import styled from 'styled-components'
import useFilters from '../hooks/useFilters'
import FiltersContent from './FiltersContent'

const ActiveFilters = () => {
  const { debouncedSearch, setSearch, search } = useFilters()

  const activeFilters: Array<[string, () => void]> = [
    [debouncedSearch, () => setSearch('')],
  ]

  if (activeFilters.map((filter) => filter[0]).filter(Boolean).length === 0) {
    return null
  }

  return (
    <Wrapper>
      {activeFilters.map(([filterValue, clearFilter], index) => (
        <ActiveFilterButton onClick={() => clearFilter()} key={index}>
          {filterValue}

          <CloseIcon
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </CloseIcon>
        </ActiveFilterButton>
      ))}
    </Wrapper>
  )
}

const CloseIcon = styled.svg`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 20px;
`

const ActiveFilterButton = styled.button`
  display: flex;
  align-items: center;
  line-height: 34px;
  font-size: 12px;
  font-weight: 500;
  color: rgb(155, 155, 155);
  padding: 7px 10px 7px 10px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 229, 229);
  border-image: initial;
  transition: font-size 300ms ease-in 0s, line-height 300ms ease-in 0s,
    padding 300ms ease-in 0s;
`

export default ActiveFilters
