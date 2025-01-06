import { Outlet } from "react-router-dom";
import { Menu } from "./shared-components/Menu";
import { Footer } from "./shared-components/Footer";

export function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer />
    </>
  );
}
