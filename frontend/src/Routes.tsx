import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { AddProperty } from "./pages/add-property/AddProperty";
import { ViewProperty } from "./pages/view-property/ViewProperty";
import { Layout } from "./Layout";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "add-property",
        element: <AddProperty />,
      },
      {
        path: "view-property/:propertyId",
        element: <ViewProperty />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={route} />;
}
