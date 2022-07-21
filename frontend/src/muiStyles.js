import { createTheme } from "@mui/material";

export const colorPicker = {
  auto: "rgba(217, 95, 14, 0.9)",
  unlabeled: "rgba(102, 102, 102, 0.9)",
  manual: "rgba(44, 162, 95, 0.9)"
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(102, 102, 102, 1)",
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
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "transparent",
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "rgba(142, 142, 142, 0.62)",
          '&.Mui-selected': {
            color: 'black'
          }
        }
      },
    }
  },
  overrides: {
    MuiButton: {
      label:""
    }
  }
}
);