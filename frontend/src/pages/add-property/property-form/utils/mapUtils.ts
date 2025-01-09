import { apiKey } from "@/main";

export const handleLocationSelect = async ({
  coordinates: { lat, lng },
}: {
  coordinates: { lat: number; lng: number };
}) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const result = data.results[0];
      const address = result.formatted_address;
      const zipCode = result.address_components.find(
        (component: { types: string | string[] }) =>
          component.types.includes("postal_code")
      )?.long_name;
      const city = result.address_components.find(
        (component: { types: string | string[] }) =>
          component.types.includes("locality")
      )?.long_name;
      return {
        address,
        city,
        zipCode,
        coordinates: { lat, lng },
      };
    } else {
      console.error("Geocoding API error:", data.error_message || data.status);
      console.error("Failed to fetch address details.");
    }
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    console.error("An error occurred while fetching address details.");
  }
};
