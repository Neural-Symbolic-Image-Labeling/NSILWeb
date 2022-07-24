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
    }
  },
  typography: {
    fontFamily: [
      'Inter',
    ]
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          'font-family': 'Inter',
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