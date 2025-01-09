import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { useParams } from "react-router-dom";
import { MapProvider } from "@/shared/map-provider/Map";
import { InformationPanel } from "@/app-components/information-panel/InformationPanel";
import { infoUtils } from "./utils/infoUtils";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.jpg";
import home3 from "@/assets/home3.jpeg";

export function ViewProperty() {
  const { id } = useParams();
  const { properties } = usePropertyContext();
  if (!id) {
    return <div>Invalid ID</div>;
  }
  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return <div>Error...</div>;
  }
  const property = properties.data.find((item) => item.id === id);
  if (property === undefined) {
    return <div>Property not found</div>;
  }

  const images = [home1, home2, home3];
  const { infoData, infoFields } = infoUtils(property);

  console.log(property.coordinates);
  return (
    <div className="flex flex-col p-5">
      <div className="text-3xl p-5">Property Details</div>
      <InformationPanel
        infoData={infoData}
        infoFields={infoFields}
        images={images}
      />
      <div className="flex min-w-lg h-80">
        <MapProvider
          locations={[{ key: property.id, location: property.coordinates }]}
        />
      </div>
    </div>
  );
}
