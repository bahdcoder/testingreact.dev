import React, { FC } from 'react'
import styled from 'styled-components'
import useFilters from '../hooks/useFilters'

export const FiltersContent: FC = () => {
  const { search, setSearch } = useFilters()

  return (
    <>
      <FilterWrapper>
        <FilterHeader>
          <span>{'Search'}</span>
          <FilterHeaderReset onClick={() => setSearch('')}>
            Reset to default
          </FilterHeaderReset>
        </FilterHeader>

        <SearchInput
          value={search}
          placeholder="largo"
          onChange={(event) => setSearch(event.target.value)}
        />
      </FilterWrapper>
    </>
  )
}

export default FiltersContent

const SearchInput = styled.input`
  width: 100%;
  border: 0;
  margin: 0;
  display: block;
  background: none;
  padding: 14px;
  margin-top: 14px;
  background-color: #f5f5f5;
  border-radius: 0px;
`

const FilterWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  margin: 8px 0px;
  padding: 35px 30px 30px 40px;
  margin-bottom: 10px;
`

const FilterHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const FilterHeaderReset = styled.div`
  color: rgb(155, 155, 155);
  cursor: pointer;
  transition: 0.1s;
  font-size: 14px;
  border: none;
  background: none;

  &:hover {
    color: rgb(0, 0, 0);
  }
`
