import React, { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import GlobalStyle from './global-styles'

const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  const { stack, message } = error
  return (
    <>
      <GlobalStyle />
      <div style={{ margin: '5.5rem 1rem 1rem' }}>
        <h1>{error.name}</h1>
        <h2 style={{ whiteSpace: 'pre' }}>{error.message}</h2>
        <pre style={{ fontFamily: 'monospace' }}>{stack?.replace(message, '')}</pre>
      </div>
    </>
  )
}

export default ErrorFallback
