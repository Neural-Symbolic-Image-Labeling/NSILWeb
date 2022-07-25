import { createTheme } from "@mui/material";

export const colorPicker = {
  auto: "rgba(217, 95, 14, 0.9)",
  unlabeled: "rgba(102, 102, 102, 0.9)",
  manual: "rgba(44, 162, 95, 0.9)"
}

export const adjustedScrollbar = {
  hidden: {
    // Chrome
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    // Firefox
    'scrollbar-width': 'none'
  },
  thin: {
    // Chrome
    '::-webkit-scrollbar': {
      width: '9px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      'background-color': 'rgba(155, 155, 155, 0.5)',
      'border-radius': '20px',
      'border': 'transparent',
    },
    // Firefox
    'scrollbar-width': 'thin',
    'scrollbar-color': 'rgba(155, 155, 155, 0.5) transparent',
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(4, 18, 141, 1)",
    },
    purple: {
      dark: "rgba(4, 18, 141, 0.8)",
      light: "rgba(90, 106, 191, 1)",
    },
    bg: {
      main: "rgba(1, 36, 88, 0.08)",
      canvas: "rgba(219, 227, 240, 0.72)",
      hovergrey: "rgba(255, 255, 255, 0.2)",
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