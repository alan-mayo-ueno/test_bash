import React from 'react'
import config from 'config'
import { Container, StyledDivCol, StyledDivRow } from './styled'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const { pathname } = useLocation()

  return (
    <Container>
      <StyledDivRow>
        <StyledDivCol>
          <h2>Home</h2>
          <p>pathname: {pathname}</p>
          <p>APP_ENV: {config.env}</p>
        </StyledDivCol>
      </StyledDivRow>
    </Container>
  )
}

export default Home
