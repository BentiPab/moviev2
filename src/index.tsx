import { CircularProgress } from "@mui/material";
import App from "components/App/App";
import store from "features/store";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styleguide/globalStyle";
import theme from "styleguide/theme";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<CircularProgress />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
