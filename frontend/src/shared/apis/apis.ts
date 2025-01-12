import { apiKey } from "@/main";
import { FormSchema } from "@/pages/add-property/utils/formSchemaUtils";
import { Property, PropertyList, Response } from "@/types";
import { FetchOptions, GeocodeResponse } from "@/shared/apis/types";

async function fetchWrapper<T>(props: FetchOptions): Promise<Response<T>> {
  const { endpoint, method, headers, body } = props;
  const response = await fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  try {
    if (!response.ok) {
      const errorData = await response.json();
      return { status: "error", error: errorData.error };
    }
    const responseData = await response.json();
    return { status: "success", data: responseData };
  } catch {
    return {
      status: "error",
      error: "Internal Server Error, Please try again later",
    };
  }
}

export const getProperties = async (): Promise<Response<PropertyList>> => {
  const propertiesResponse = await fetchWrapper<{
    properties: PropertyList;
  }>({
    endpoint: "/api/properties/",
    method: "GET",
  });
  if (propertiesResponse.status === "success") {
    return { status: "success", data: propertiesResponse.data.properties };
  }
  return propertiesResponse;
};

export const getMapAddress = async (
  lat: number,
  lng: number
): Promise<
  Response<{
    address: string;
    zipCode: string;
    city: string;
    coordinates: { lat: number; lng: number };
  }>
> => {
  const response = await fetchWrapper<GeocodeResponse>({
    endpoint: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    method: "GET",
  });
  if (response.status === "success") {
    const result = response.data.results[0];
    const address = result.formatted_address;
    const zipCode =
      result.address_components.find(
        (component: { types: string | string[] }) =>
          component.types.includes("postal_code")
      )?.long_name || "";
    const city =
      result.address_components.find(
        (component: { types: string | string[] }) =>
          component.types.includes("locality")
      )?.long_name || "";
    return {
      status: "success",
      data: { address, city, zipCode, coordinates: { lat, lng } },
    };
  }
  return response;
};

export const postPropertyItem = async (
  property: FormSchema
): Promise<Response<Property>> => {
  const propertyDataPostResponse = await fetchWrapper<{
    property: Property;
  }>({
    endpoint: "/api/properties/new/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: property,
  });
  if (propertyDataPostResponse.status === "success") {
    return { status: "success", data: propertyDataPostResponse.data.property };
  } else {
    return propertyDataPostResponse;
  }
};

export const valueAssessmentFromAI = async (propertyInfo: {
  address: string;
  zipCode: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}): Promise<Response<string>> => {
  const response = await fetchWrapper<{ response: string }>({
    endpoint: "http://localhost:11434/api/generate",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      model: "llama3.2", // or another model available in your Ollama
      stream: false,
      prompt: `give estimated value of this property as per market value in 1 sentence, make sure to give absolute educated guess based value for this 3-bedroom residential property ${JSON.stringify(
        propertyInfo
      )} please keep the answer in 1 sentence`,
    },
  });
  if (response.status === "success") {
    return { status: "success", data: response.data.response };
  } else {
    return response;
  }
};
