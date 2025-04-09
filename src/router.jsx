import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/dashboard/page";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
]);

export default router;
