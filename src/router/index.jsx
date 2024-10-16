import { Route, Routes } from "react-router-dom";
import { BaseLayout, AdminLayout } from "../components";
import { Home, Page404 } from "../pages";
import * as A from "../pages/admin";

export const Router = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <BaseLayout>
            <Home />
          </BaseLayout>
        }
      />
      <Route
        exact
        path="/dasboard"
        element={
          <AdminLayout>
            <A.Home />
          </AdminLayout>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
