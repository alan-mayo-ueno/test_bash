import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

import {
  createGenerateClassName,
  StylesProvider,
} from '@material-ui/core/styles';
import { theme } from '@ueno-tecnologia-org/ueno-bo-shared';
import { appNameExport } from '../../constants';

const generateClassName = createGenerateClassName({
  productionPrefix: `${appNameExport}Host`,
  seed: `${appNameExport}Host`,
});

const ThemeProvider = ({ children }: any) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createTheme(theme)}>{children}</MuiThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProvider;
