import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  AdvancedMarker,
  Pin,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

const mapId = "somerandomid";

type Poi = { key: string; location: google.maps.LatLngLiteral };

type MapProviderProps = {
  locations: Poi[];
  onLocationSelect?: (coordinates: { lat: number; lng: number }) => void;
};

export function MapProvider(props: MapProviderProps) {
  const navigate = useNavigate();
  const locations = props.locations;
  const [addressInfo, setAddressInfo] = useState<string>("");

  const handleMapClick = async (ev: MapMouseEvent) => {
    if (!ev.detail.latLng) {
      console.error("Event does not have latLng.");
      alert("Invalid area selected");
      return;
    }
    props.onLocationSelect?.({
      lat: ev.detail.latLng.lat,
      lng: ev.detail.latLng.lng,
    });
    setAddressInfo(
      ev.detail.latLng.lat.toString() + ", " + ev.detail.latLng.lng.toString()
    );
  };

  const handleMarkerClick = (id: string) => {
    console.log(id);
    navigate(`/view-property/${id}`);
  };

  return (
    <div className="relative w-full h-full">
      <Map
        mapId={mapId}
        defaultZoom={3}
        draggableCursor="pointer"
        gestureHandling={"greedy"}
        defaultCenter={locations[0].location}
        className="w-full h-full"
        onClick={handleMapClick}
      >
        {locations.map((poiItem) => (
          <AdvancedMarker
            key={poiItem.key}
            position={poiItem.location}
            onClick={() => handleMarkerClick(poiItem.key)}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </Map>
      <div className="absolute top-0 left-0 bg-white p-4 m-4 shadow-lg">
        {addressInfo || "Click on the map to get address details."}
      </div>
    </div>
  );
}
