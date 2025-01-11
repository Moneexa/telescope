import { getMapAddress } from "@/shared/apis/apis";

export const getPinAddress = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const geoCodingAPIResults = await getMapAddress(lat, lng);
  if (geoCodingAPIResults.status === "success") {
    return geoCodingAPIResults.data;
  }
};
