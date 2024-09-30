import { Router } from "./router";
import { ConfigsInitializer, VersionProvider } from "./providers/index.js";

export const App = () => {
  return (
    <VersionProvider>
      <ConfigsInitializer>
        <Router />
      </ConfigsInitializer>
    </VersionProvider>
  );
};
