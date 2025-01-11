import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListProperty } from "./ListProperty";
import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { MapProvider } from "@/shared/components/MapProvider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Notification } from "@/shared/components/Notification";

export function Home() {
  const { properties } = usePropertyContext();

  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return (
      <div>
        <div className="py-5">
          <Notification
            variant="destructive"
            color="red"
            msg={properties.error}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-5">
      <Tabs defaultValue="list" className="flex-1">
        <div className="flex justify-center items-center py-5 relative">
          <div className="flex justify-center items-center">
            <TabsList className="grid max-w-lg grid-cols-2">
              <TabsTrigger value="list">Property List</TabsTrigger>
              <TabsTrigger value="map">Property Map</TabsTrigger>
            </TabsList>
          </div>
          <Button className="absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/add-property">Add Property</Link>
          </Button>
        </div>
        <TabsContent value="list" className="py-5">
          {properties.data.length > 0 ? (
            <ListProperty />
          ) : (
            <div className="py-5">
              <Notification
                variant="default"
                msg="There is no property, add one, by clicking on Add Property button"
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="map" className="py-5">
          <div className="min-w-80 h-96">
            <MapProvider
              locations={
                properties.data.length > 0
                  ? properties?.data?.map((item) => ({
                      key: item.id,
                      location: item.coordinates,
                    }))
                  : []
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
