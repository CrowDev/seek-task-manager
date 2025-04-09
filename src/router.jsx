import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/dashboard/page";
import DefaultLayout from "./components/layout/DefaultLayout";
import App from "./App";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
    ],
  },
]);

export default router;
