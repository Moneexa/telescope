import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { useParams } from "react-router-dom";
import { MapProvider } from "@/shared/components/MapProvider";
import { InformationPanel } from "@/shared/components/information-panel/InformationPanel";
import { propertyInfoUtils } from "@/pages/view-property/utils/infoUtils";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.jpg";
import home3 from "@/assets/home3.jpeg";
import { Notification } from "@/shared/components/Notification";

export function ViewProperty() {
  const { propertyId } = useParams();

  const { properties } = usePropertyContext();
  if (!propertyId) {
    return <div>Invalid ID</div>;
  }
  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return (
      <div className="p-5">
        <Notification
          color="red"
          variant="destructive"
          msg={properties.error}
        />
      </div>
    );
  }

  if (properties.data.length === 0) {
    return (
      <div className="p-5">
        <Notification
          variant="default"
          msg="There is No Property, Please add one"
        />
      </div>
    );
  }

  const property = properties.data.find((item) => item.id === propertyId);
  const images = [home1, home2, home3];
  if (!property) {
    return (
      <div className="py-5">
        <Notification
          variant="destructive"
          color="red"
          msg="This property no longer exists!"
        />
      </div>
    );
  }
  const { informationPanelPropertyData } = propertyInfoUtils(property);

  console.log(property.coordinates);
  return (
    <div className="flex flex-col px-5 py-1">
      <div className="text-3xl px-5 ">Property Details</div>
      <InformationPanel
        infoData={informationPanelPropertyData}
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
