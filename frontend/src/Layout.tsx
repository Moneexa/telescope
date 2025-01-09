import { Outlet } from "react-router-dom";
import { TopBar } from "./shared/TopBar";
import Breadcrumbs from "./shared/Breadcrumb";

export function Layout() {
  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
