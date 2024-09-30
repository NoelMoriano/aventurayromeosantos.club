import { Router } from "./router";
import { ConfigsInitializer } from "./providers/index.js";

export const App = () => {
  return (
    <ConfigsInitializer>
      <Router />
    </ConfigsInitializer>
  );
};
