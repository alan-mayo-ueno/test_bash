import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import routes from 'routes/routes';
import ErrorFallback from 'components/common/error-fallback';
import GlobalStyle from 'components/common/global-styles';
import ThemeProvider from 'theme/provider';
import config from 'config';

const appStyles = {
  marginTop: ' 3.5rem',
  padding: '1rem',
  display: 'flex',
  minHeight: 'calc(100vh - 5.5rem)',
  height: '92%',
};

// Si no queres mocks, modifica la condición para que no entre. Ej: 'disabled'
// Si el servicio esta en STG, usa el webpack dev server que esta en webpack.common.ts

// function prepare() {
//   if (process.env.MSW_MOCKS === 'enabled') {
//     const { worker } = require('./mocks')
//     return worker.start()
//   }
//   return Promise.resolve()
// }

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GlobalStyle />
      <ThemeProvider>
        <Box sx={appStyles}>
          <RouterProvider router={createBrowserRouter(routes, { basename: config.basename})} />
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
