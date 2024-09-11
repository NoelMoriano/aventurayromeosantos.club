import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, theme } from "./styles";
import { ScrollTop } from "./ScrollTop.js";
import { ThemeProvider } from "styled-components";
import { GoogleAnalyticsProvider } from "./providers/GoogleAnalyticsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleAnalyticsProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollTop>
          <App />
        </ScrollTop>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleAnalyticsProvider>,
);
