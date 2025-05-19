import { Outlet } from "react-router-dom";
import { SidebarMenu } from "../Menu/SidebarMenu";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-row w-full min-h-screen">
      <SidebarMenu />
      <div className="flex-1 bg-white overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
