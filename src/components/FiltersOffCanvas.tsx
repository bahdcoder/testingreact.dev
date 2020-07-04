import ReactDOM from 'react-dom'
import styled from 'styled-components'
import React, {
  FunctionComponent,
  useRef,
  Fragment,
  useState,
  useEffect,
} from 'react'

// hooks
import useFilters from '../hooks/useFilters'
import useOutsideClick from '../hooks/useOutsideClick'

import FiltersContent from './FiltersContent'

const FiltersOffCanvas: FunctionComponent = () => {
  const offCanvasRef = useRef<HTMLDivElement>(null)
  const [portalNode] = useState(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(portalNode)

    return () => portalNode.remove()
  }, [portalNode])

  const { showingFilters, toggleShowingFilters, setSearch } = useFilters()

  useOutsideClick(offCanvasRef, () => {
    if (showingFilters) {
      toggleShowingFilters()
    }
  })

  return ReactDOM.createPortal(
    <Fragment>
      <Overlay showingFilters={showingFilters} />
      <CanvasWrapper ref={offCanvasRef} showingFilters={showingFilters}>
        {showingFilters ? (
          <InnerWrapper>
            <Header>
              <span>Filter products</span>
              <CloseCanvas
                viewBox="0 0 14 24"
                data-testid="CloseCanvas"
                onClick={toggleShowingFilters}
              >
                <path
                  fill="#000"
                  fillRule="nonzero"
                  d="M0 2.902L2.727 0l8.535 9.087.232.246L14 12.001l-2.506 2.666-.232.246-8.316 8.854-.22.233L0 21.1l8.537-9.09.01-.01z"
                />
              </CloseCanvas>
            </Header>

            <InnerContent>
              <FiltersContent />
            </InnerContent>

            <Footer>
              <ResetToDefaultButton
                onClick={() => {
                  setSearch('')
                }}
              >
                Reset to defaults
              </ResetToDefaultButton>
              <ViewResultsButton
                data-testid="ViewResultsButton"
                onClick={toggleShowingFilters}
              >
                View results
              </ViewResultsButton>
            </Footer>
          </InnerWrapper>
        ) : null}
      </CanvasWrapper>
    </Fragment>,
    portalNode,
  )
}

const InnerContent = styled.div`
  flex-grow: 1;
  background-color: #f5f5f5;
`

const ResetToDefaultButton = styled.button`
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  background-color: rgb(253, 253, 253);
  color: rgb(0, 0, 0);
  border-radius: 2px;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  text-decoration: none;
  margin-right: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 229, 229);
  border-image: initial;
  padding: 15px;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.04) 0px 10px 15px 0px,
      rgba(0, 0, 0, 0.08) 0px 2px 2px 0px;
  }

  @media (min-width: 1024px) {
    width: auto;
  }
`

const ViewResultsButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  flex-grow: 1;
  display: inline-block;
  padding: 15px;
  border: none;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 2px;
  width: 100%;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.04) 0px 10px 15px 0px,
      rgba(0, 0, 0, 0.08) 0px 2px 2px 0px;
  }

  @media (min-width: 1024px) {
    width: 100px;
  }
`

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Footer = styled.footer`
  display: flex;
  padding: 30px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-between;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const CloseCanvas = styled.svg`
  width: 14px;
  height: 14px;
  cursor: pointer;
`

const Header = styled.header`
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 10px 15px 0px,
    rgba(0, 0, 0, 0.05) 0px 2px 2px 0px;
`

const Overlay = styled.div<{
  showingFilters: boolean
}>`
  z-index: 99;
  height: 100vh;
  top: 0;
  position: absolute;

  @media (min-width: 1024px) {
    width: ${(props) => (props.showingFilters ? 'calc(100% - 410px)' : '0px')};
  }

  transition: 0.25s;
  background-color: rgba(0, 0, 0, 0.25);
`

const CanvasWrapper = styled.div<{
  showingFilters: boolean
}>`
  width: ${(props) => (props.showingFilters ? '100%' : '0px')};
  position: absolute;
  right: 0;
  top: 0px;
  @media (min-width: 1024px) {
    width: ${(props) => (props.showingFilters ? '410px' : '0px')};
  }
  background-color: #ffffff;
  height: 100vh;
  transition: 0.25s;
`

export default FiltersOffCanvas
