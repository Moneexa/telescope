import { Property } from "@/types";
export const infoUtils = (property: Property) => {
  const infoData = {
    name: property.name,
    address: property.address,
    city: property.city,
    zipCode: property.zipCode,
    totalFinancialRisk: property.totalFinancialRisk,
    riskRatio: `${property.noHandledRisks} / ${property.noRelevantRisks}`,
  } as const;
  const infoFields: { label: string; key: keyof typeof infoData }[] = [
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Zip Code", key: "zipCode" },
    { label: "Total Financial Risk", key: "totalFinancialRisk" },
    { label: "Risk Ratio", key: "riskRatio" },
  ];
  return { infoData, infoFields };
};
