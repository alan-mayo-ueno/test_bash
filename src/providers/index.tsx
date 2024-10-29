import React from "react"
import ThemeProvider from "../theme/provider"

const Providers = ({ children }: any) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default Providers