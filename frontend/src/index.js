import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { WebRouters } from './routers';
import { Provider } from 'react-redux';
import store from "./stores";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './muiStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <WebRouters />
      </ThemeProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
