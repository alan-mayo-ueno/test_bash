import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#62CAA3',
    },
    secondary: {
      main: '#000',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f39c12',
    },
    info: {
      main: '#2980b9',
    },
    success: {
      main: '#27ae60',
    },
    grey: {
      50: '#1A1A1A',
      100: '#333333',
      200: '#4D4D4D',
      300: '#818180',
      400: '#AAAAAA',
      500: '#D2D2D2',
      600: '#EAEAEA',
      // 700: '#F2F2F2',
      800: '#F9F9F9',
      900: '#FFFFFF',
    },
    text: {
      primary: '#212124',
    },
    divider: '#D2D2D2',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

export default theme
