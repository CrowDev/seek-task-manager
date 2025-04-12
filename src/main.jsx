import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "react-oidc-context";
import DefaultLayout from "./components/layout/DefaultLayout";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import DashboardPage from "./pages/dashboard/page";
import ChartPage from "./pages/chart/page";
import { DashboardContextProvider } from "@/contexts/dashboard/DashboardContext";
import App from "./App";
import {
  VITE_AWS_AUTHORITY,
  VITE_AWS_CLIENT_ID,
  VITE_AWS_REDIRECT_URI,
  VITE_AWS_RESPONSE_TYPE,
  VITE_AWS_SCOPE,
} from "@/utils/constants";

const cognitoAuthConfig = {
  authority: VITE_AWS_AUTHORITY,
  client_id: VITE_AWS_CLIENT_ID,
  redirect_uri: VITE_AWS_REDIRECT_URI,
  response_type: VITE_AWS_RESPONSE_TYPE,
  scope: VITE_AWS_SCOPE,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <DashboardContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<App />} />
              <Route
                path="/board"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/charts"
                element={
                  <ProtectedRoute>
                    <ChartPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DashboardContextProvider>
    </AuthProvider>
  </StrictMode>,
);
