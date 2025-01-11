import { Property } from "@/types";
export const propertyInfoUtils = (property: Property) => {
  const informationPanelPropertyData = [
    { value: property.name, label: "Name" },
    { value: property.address, label: "Address" },
    { value: property.city, label: "City" },
    { value: property.zipCode, label: "Zip Code" },
    {
      value: property.totalFinancialRisk,
      label: "Total Financial Risk (in NOKs)",
    },
    {
      value: `${property.noHandledRisks} / ${property.noRelevantRisks}`,
      label: "Risk Ratio of Handled over Relevant",
    },
  ];
  return { informationPanelPropertyData };
};
