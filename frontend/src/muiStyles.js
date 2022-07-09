import { createTheme } from "@mui/material";

export const colorPicker = {
  auto: "rgba(217, 95, 14, 0.9)",
  unlabeled: "rgba(102, 102, 102, 0.9)",
  manual: "rgba(44, 162, 95, 0.9)"
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(25, 74, 102, 0.8)",
    }
  },
  typography: {
    fontFamily: [
      'Helvetica',
    ]
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Helvetica',
          font-style: normal;
        }`
    }
  },
  overrides: {
    MuiButton: {
      label:""
    }
  }
}
);