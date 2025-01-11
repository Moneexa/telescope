import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Map,
  AdvancedMarker,
  Pin,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { toast } from "@/hooks/use-toast";

const mapId = "somerandomid";

type Point = { key: string; location: google.maps.LatLngLiteral };

type MapProviderProps = {
  locations?: Point[];
  onLocationSelect?: (coordinates: { lat: number; lng: number }) => void;
};

export function MapProvider(props: MapProviderProps) {
  const navigate = useNavigate();
  const locations = props.locations;
  const [addressInfo, setAddressInfo] = useState<string>("");

  const handleMapClick = async (ev: MapMouseEvent) => {
    if (!ev.detail.latLng) {
      toast({ variant: "destructive", description: "Invalid area selected" });
      return;
    }
    props.onLocationSelect?.({
      lat: ev.detail.latLng.lat,
      lng: ev.detail.latLng.lng,
    });
    setAddressInfo(
      `latitude:${ev.detail.latLng.lat.toString()}, longitude:${ev.detail.latLng.lng.toString()}`
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
        defaultZoom={5}
        draggableCursor="pointer"
        gestureHandling={"greedy"}
        defaultCenter={
          locations && locations.length > 0
            ? locations?.[0].location
            : { lat: 0, lng: 0 }
        }
        className="w-full h-full"
        onClick={handleMapClick}
      >
        {locations && locations.length > 0
          ? locations.map((location) => (
              <AdvancedMarker
                key={location.key}
                position={location.location}
                onClick={() => handleMarkerClick(location.key)}
              >
                <Pin
                  background={"#FBBC04"}
                  glyphColor={"#000"}
                  borderColor={"#000"}
                />
              </AdvancedMarker>
            ))
          : ""}
      </Map>
      {props.onLocationSelect && (
        <div className="absolute top-[60px] left-[8px] bg-white p-4 shadow-lg">
          {addressInfo || "Click on the map to get address details."}
        </div>
      )}
    </div>
  );
}
