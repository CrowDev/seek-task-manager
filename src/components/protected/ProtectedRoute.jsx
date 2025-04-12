import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return children;
  }
  navigate("/");
};

export default ProtectedRoute;
