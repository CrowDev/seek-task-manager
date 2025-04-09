import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="p-3 bg-gray-200 md:p-5 min-h-dvh">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
