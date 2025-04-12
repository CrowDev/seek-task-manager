import { AppBar, Box } from "@mui/material";
import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { useAuth } from "react-oidc-context";
import {
  VITE_AWS_CLIENT_ID,
  VITE_AWS_LOGOUT_REDIRECT_URI,
  VITE_AWS_COGNITO_DOMAIN,
} from "@/utils/constants";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const DefaultLayout = () => {
  const handleSignOut = () => {
    auth.removeUser();
    signOutRedirect();
  };
  const signOutRedirect = () => {
    const clientId = VITE_AWS_CLIENT_ID;
    const logoutUri = VITE_AWS_LOGOUT_REDIRECT_URI;
    const cognitoDomain = VITE_AWS_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };
  const auth = useAuth();
  return (
    <div className="bg-neutral-mist min-h-dvh min-w-[430px]">
      <Box>
        <AppBar
          sx={{
            backgroundColor: "#1a365d",
            paddingY: "15px",
          }}
        >
          <div className="flex justify-between px-3 mx-auto w-full max-w-7xl lg:px-0">
            <span className="text-2xl text-semibold">Task Manager</span>
            {auth.isAuthenticated && (
              <div className="flex items-center space-x-10">
                <nav className="flex space-x-3">
                  <NavLink
                    to="/board"
                    className={({ isActive }) =>
                      isActive
                        ? "text-accent-success font-semibold"
                        : "text-secondary-silver"
                    }
                    end
                  >
                    Board
                  </NavLink>
                  <NavLink
                    to="/charts"
                    className={({ isActive }) =>
                      isActive
                        ? "text-accent-success font-semibold"
                        : "text-secondary-silver"
                    }
                    end
                  >
                    Charts
                  </NavLink>
                </nav>
                <IconButton
                  sx={{ color: "#fff" }}
                  aria-label="signout"
                  onClick={handleSignOut}
                >
                  <ExitToAppIcon />
                </IconButton>
              </div>
            )}
          </div>
        </AppBar>
      </Box>
      <div className="px-3 md:px-5 pt-[50px] mt-[54px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
