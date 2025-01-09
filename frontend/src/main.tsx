import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./Routes.tsx";
import { PropertyProvider } from "./shared/store/PropertyProvider.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
import { StrictMode } from "react";
export const apiKey = "AIzaSyCmhwxgkFS_R3sOr4LhiRDa8aIBGWd6vRM";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PropertyProvider>
      <APIProvider
        apiKey={apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Routes />
      </APIProvider>
    </PropertyProvider>
  </StrictMode>
);
