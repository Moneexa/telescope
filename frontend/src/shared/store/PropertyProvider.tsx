import { PropertyList, Response } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface PropertyContextType {
  properties: Response<PropertyList>;
  getList: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Response<PropertyList>>({
    status: "loading",
  });
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const propertiesResponse = await fetch("/api/properties/");
    if (propertiesResponse.ok) {
      const propertiesList = await propertiesResponse.json();
      console.log(propertiesList);
      setProperties({
        status: "success",
        data: propertiesList.properties,
      });
    } else {
      setProperties({ status: "error", error: propertiesResponse.statusText });
    }
  };

  return (
    <PropertyContext.Provider value={{ properties, getList }}>
      {children}
    </PropertyContext.Provider>
  );
};

const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error(
      "usePropertyContext must be used within a PropertyProvider"
    );
  }
  return context;
};

export { PropertyProvider, usePropertyContext };
