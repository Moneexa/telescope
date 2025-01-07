import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
const mapId = "somerandomid";

type Poi = { key: string; location: google.maps.LatLngLiteral };

const locations: Poi[] = [];
export function ViewMap() {
  const navigate = useNavigate();

  const { properties } = usePropertyContext();
  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return <div>Error...</div>;
  }
  properties.data.map((item) => {
    locations.push({ key: item.id, location: item.coordinates });
  });
  const handleClick = async (id: string, ev: google.maps.MapMouseEvent) => {
    console.log(id);
    navigate(`/view-property/${id}`);
    if (!ev.latLng) {
      console.error("Event does not have latLng.");
      alert("Invalid area selected");
      return;
    }
  };
  return (
    <Map
      mapId={mapId}
      defaultZoom={4}
      draggableCursor="pointer"
      gestureHandling={"greedy"}
      defaultCenter={locations[0].location}
      className="w-full h-96"
    >
      {locations.map((poiItem) => (
        <AdvancedMarker
          key={poiItem.key}
          position={poiItem.location}
          onClick={(ev) => handleClick(poiItem.key, ev)}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </Map>
  );
}
