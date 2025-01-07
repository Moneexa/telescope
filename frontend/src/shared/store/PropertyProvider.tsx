import { PropertyList, Response } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

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

  const getList = () => {
    const mockProperties: PropertyList = [
      {
        id: "1",
        address: "123 Main St",
        zipCode: "12345",
        city: "Los Angeles",
        coordinates: { lat: 34.0522, lng: -118.2437 },
        name: "Modern Villa",
        estimatedValue: 450000,
        noRelevantRisks: 3,
        noHandledRisks: 2,
        totalFinancialRisk: 10000,
      },
      {
        id: "2",
        address: "456 Elm St",
        zipCode: "54321",
        city: "New York",
        coordinates: { lat: 40.7128, lng: -74.006 },
        name: "City Apartment",
        estimatedValue: 300000,
        noRelevantRisks: 2,
        noHandledRisks: 1,
        totalFinancialRisk: 5000,
      },
      {
        id: "3",
        address: "789 Oak St",
        zipCode: "67890",
        city: "Miami",
        coordinates: { lat: 25.7617, lng: -80.1918 },
        name: "Beach House",
        estimatedValue: 600000,
        noRelevantRisks: 4,
        noHandledRisks: 2,
        totalFinancialRisk: 20000,
      },
      {
        id: "4",
        address: "101 Pine St",
        zipCode: "13579",
        city: "San Francisco",
        coordinates: { lat: 37.7749, lng: -122.4194 },
        name: "Victorian Mansion",
        estimatedValue: 800000,
        noRelevantRisks: 5,
        noHandledRisks: 3,
        totalFinancialRisk: 30000,
      },
    ];
    setProperties({ status: "success", data: mockProperties });
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
