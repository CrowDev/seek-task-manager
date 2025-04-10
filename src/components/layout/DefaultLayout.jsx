import { AppBar, Box } from "@mui/material";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="bg-neutral-mist min-h-dvh min-w-[430px]">
      <Box>
        <AppBar
          sx={{
            backgroundColor: "#1a365d",
            paddingY: "15px",
          }}
        >
          <div className="mx-auto w-full max-w-7xl">Task Manager</div>
        </AppBar>
      </Box>
      <div className="p-3 md:p-5 mt-[54px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
