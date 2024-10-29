import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Avenir';
    margin: 0;
    padding: 0;
    background: #fcfcfe;
  }
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
    color: #000;
  }
  a:hover {
    text-decoration: none;
    color: #000;
  }
`

export default GlobalStyle
