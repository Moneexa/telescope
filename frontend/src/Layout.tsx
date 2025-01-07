import { Outlet } from "react-router-dom";
import { TopBar } from "./shared/TopBar";

export function Layout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}
