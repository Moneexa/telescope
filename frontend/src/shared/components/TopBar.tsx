import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.svg";
export function TopBar() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <Link to="/">
            <NavigationMenuItem className="p-3">
              <img width={150} src={logo} />
            </NavigationMenuItem>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
