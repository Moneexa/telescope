import { Outlet } from "react-router-dom";
import { TopBar } from "@/shared/components/TopBar";
import Breadcrumbs from "@/shared/components/Breadcrumb";
import { Toaster } from "./components/ui/toaster";

export function Layout() {
  return (
    <div>
      <TopBar />
      <Breadcrumbs />
      <Outlet />
      <Toaster />
    </div>
  );
}
