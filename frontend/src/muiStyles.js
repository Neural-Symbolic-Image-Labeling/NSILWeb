import { createTheme } from "@mui/material";

export const colorPicker = {
  auto: "rgba(217, 95, 14, 0.9)",
  unlabeled: "rgba(102, 102, 102, 0.9)",
  manual: "rgba(44, 162, 95, 0.9)"
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(4, 18, 141, 1)",
    },
    purple: {
      dark: "rgba(4, 18, 141, 1)",
      light: "rgba(90, 106, 191, 1)",
    },
    bg: {
      main: "rgba(1, 36, 88, 0.08)",
      canvas: "rgba(219, 227, 240, 0.72)"
    }
  },
  typography: {
    fontFamily: [
      'Helvetica',
    ]
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          'font-family': 'Helvetica',
          'font-style': 'normal'
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          'box-shadow': 'none',
        }
      }
    },
  }
});