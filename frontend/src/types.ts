export type Property = {
  id: string;
  address: string;
  zipCode: string;
  city: string;
  coordinates: { lat: number; lng: number };
  name: string;
  estimatedValue: number;
  noRelevantRisks: number;
  noHandledRisks: number;
  totalFinancialRisk: number;
};
export type PropertyList = Property[];

export type Response<T> =
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
    };
