import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, theme } from "./styles";
import { ScrollTop } from "./ScrollTop.js";
import { ThemeProvider } from "styled-components";
import { GoogleAnalyticsProvider } from "./providers/GoogleAnalyticsProvider.jsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <GoogleAnalyticsProvider>
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colors.primary,
            colorInfo: theme.colors.primary,
            colorTextBase: theme.colors.font2,
          },
        }}
      >
        <GlobalStyle />
        <BrowserRouter>
          <ScrollTop>
            <App />
          </ScrollTop>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  </GoogleAnalyticsProvider>,
);
