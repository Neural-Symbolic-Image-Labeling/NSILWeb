import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Arial',
    ]
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Arial',
          font-style: normal;
        }`
    }
  }
}
);