// validation-schema.ts
import { z } from "zod";

// Schema to validate form data
export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  totalFinancialRisk: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Must be a positive number.",
    }),
  noRelevantRisks: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Must be a positive number.",
    }),
  noHandledRisks: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Must be a positive number.",
    }),
  address: z.string().min(1, { message: "Address is required." }),
  zipCode: z.string().min(1, { message: "Zip Code is required." }),
  city: z.string().min(1, { message: "City is required." }),
  estimatedValue: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Must be a positive number.",
    }),
  latitude: z
    .number()
    .refine((val) => !isNaN(val), { message: "Latitude must be required" }),
  longitude: z
    .number()
    .refine((val) => !isNaN(val), { message: "Longitude be a required." }),
});

export type FormSchema = z.infer<typeof formSchema>;

export const defaultValues: FormSchema = {
  name: "",
  totalFinancialRisk: 0,
  noRelevantRisks: 0,
  noHandledRisks: 0,
  address: "",
  zipCode: "",
  city: "",
  estimatedValue: 0,
  latitude: 0.0,
  longitude: 0.0,
};
