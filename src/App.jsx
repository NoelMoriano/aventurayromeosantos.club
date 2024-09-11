import { Router } from "./router";
import {
  ConfigsInitializer,
  GlobalDataProvider,
  VersionProvider,
} from "./providers/index.js";

export const App = () => {
  return (
    <VersionProvider>
      <ConfigsInitializer>
        <GlobalDataProvider>
          <Router />
        </GlobalDataProvider>
      </ConfigsInitializer>
    </VersionProvider>
  );
};
