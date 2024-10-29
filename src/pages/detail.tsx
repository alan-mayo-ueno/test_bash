import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, StyledDivCol, StyledDivRow } from './styled'

const Detail = () => {
  const { pathname } = useLocation()

  return (
    <Container>
      <StyledDivRow>
        <StyledDivCol>
          <h2>Detail</h2>
          <p>pathname: {pathname}</p>
        </StyledDivCol>
      </StyledDivRow>
    </Container>
  )
}

export default Detail
