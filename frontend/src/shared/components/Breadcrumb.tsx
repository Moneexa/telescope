import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // Assuming you have this breadcrumb component from ShadCN

const Breadcrumbs = () => {
  const location = useLocation();

  let pathSegments = location.pathname.split("/").filter((word) => !!word);
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(pathSegments[pathSegments.length - 1])) {
    pathSegments = pathSegments.slice(0, -1);
  }
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <nav className="px-5 py-1 text-sm text-blue-600 underline">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home {">"} </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const href = location.pathname;

            return (
              <BreadcrumbItem>
                <BreadcrumbLink key={index} href={href} className="underline">
                  {(segment.charAt(0).toUpperCase() + segment.slice(1)).replace(
                    "-",
                    " "
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
