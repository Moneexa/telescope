import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { useParams } from "react-router-dom";
import { MapProvider } from "@/shared/components/MapProvider";
import { InformationPanel } from "@/shared/components/information-panel/InformationPanel";
import { propertyInfoUtils } from "@/pages/view-property/utils/infoUtils";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.jpg";
import home3 from "@/assets/home3.jpeg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

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
      <Alert color="red" variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>There was problem fetching data!</AlertTitle>
        <AlertDescription>Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (properties.data.length === 0) {
    return (
      <div className="py-5">
        <Alert variant="destructive" color="red">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>This property does not exist.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const property = properties.data.find((item) => item.id === propertyId);
  const images = [home1, home2, home3];
  if (!property) {
    return (
      <div className="py-5">
        <Alert variant="destructive" color="red">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>This property does not exist.</AlertDescription>
        </Alert>
      </div>
    );
  }
  const { informationPanelPropertyData } = propertyInfoUtils(property);

  console.log(property.coordinates);
  return (
    <div className="flex flex-col p-5">
      <div className="text-3xl p-5">Property Details</div>
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
