import { Property, PropertyList, Response } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getProperties } from "@/shared/apis/apis";

interface PropertyContextType {
  properties: Response<PropertyList>;
  getPropertiesList: () => void;
  addPropertyItemInList: (item: Property) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Response<PropertyList>>({
    status: "loading",
  });
  useEffect(() => {
    getPropertiesList();
  }, []);

  const getPropertiesList = async () => {
    const propertiesResponse = await getProperties();
    setProperties(propertiesResponse);
  };

  const addPropertyItemInList = (item: Property) => {
    const propertyList = structuredClone(properties);
    if (propertyList.status === "success") {
      const propertiesList = propertyList.data;
      propertiesList.push(item);
      propertyList.data = propertiesList;
      setProperties(propertyList);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getPropertiesList,
        addPropertyItemInList,
      }}
    >
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
