import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // Assuming you have this breadcrumb component from ShadCN

function isUUID(value: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

const Breadcrumbs = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav className="p-5 text-blue-600 underline">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home {">"} </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const lastElem = pathSegments[pathSegments.length - 1];
          if (!isUUID(segment)) {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}${
              isUUID(lastElem) ? "/" + lastElem : ""
            }`;

            return (
              <BreadcrumbItem>
                <BreadcrumbLink key={index} href={path}>
                  {(segment.charAt(0).toUpperCase() + segment.slice(1)).replace(
                    "-",
                    " "
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }
        })}
      </Breadcrumb>
    </nav>
  );
};

export default Breadcrumbs;
