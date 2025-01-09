import { FieldPath } from "react-hook-form";
import { FormSchema } from "@/pages/add-property/utils/formSchemaUtils";

export const fieldMeta: Array<{
  name: FieldPath<FormSchema>;
  label: string;
  placeholder: string;
  type: string;
}> = [
  {
    name: "name",
    label: "Property Name",
    placeholder: "Enter username",
    type: "text",
  },
  {
    name: "totalFinancialRisk",
    label: "Total Financial Risk (in NOKs)",
    placeholder: "Enter total financial risk",
    type: "number",
  },
  {
    name: "noRelevantRisks",
    label: "Number of Relevant Risks",
    placeholder: "Enter number of relevant risks",
    type: "number",
  },
  {
    name: "noHandledRisks",
    label: "Number of Handled Risks",
    placeholder: "Enter number of handled risks",
    type: "number",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "text",
  },
  {
    name: "zipCode",
    label: "Zip Code",
    placeholder: "Enter zip code",
    type: "text",
  },
  { name: "city", label: "City", placeholder: "Enter city", type: "text" },
  {
    name: "estimatedValue",
    label: "Estimated Value (in NOKs)",
    placeholder: "Enter estimated value in NOK",
    type: "number",
  },
];
