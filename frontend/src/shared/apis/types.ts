export type FetchOptions = {
  endpoint: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
};

type AddressComponent = {
  types: string[]; // The types of the address component (e.g., ['postal_code'])
  long_name: string; // Full text description of the component
};

type GeocodeResult = {
  formatted_address: string; // Full formatted address
  address_components: AddressComponent[]; // Array of address components
};

export type GeocodeResponse = {
  results: GeocodeResult[]; // Array of geocoding results
};
