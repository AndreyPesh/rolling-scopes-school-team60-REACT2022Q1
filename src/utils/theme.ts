import { createTheme } from '@mui/material/styles';

const theme = {
  palette: {
    primary: {
      main: '#0a3d39',
    },
    secondary: {
      main: '#634710',
    },
    error: {
      main: '#e53e3e',
    },
  },
} as const;

type CustomTheme = {
  [Key in keyof typeof theme]: typeof theme[Key];
};

declare module '@mui/material/styles/createTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends CustomTheme {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends CustomTheme {}
}
export default createTheme(theme);
