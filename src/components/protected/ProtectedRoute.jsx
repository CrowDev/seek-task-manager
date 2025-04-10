import { useAuth } from "react-oidc-context";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
