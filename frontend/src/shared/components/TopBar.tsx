import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/file.png";
export function TopBar() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <Link to="/">
            <NavigationMenuItem>
              <img width={75} src={logo} />
            </NavigationMenuItem>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
