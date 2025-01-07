import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListProperty } from "./list-property/ListProperty";
import { ViewMap } from "./view-map/ViewMap";
import { useEffect } from "react";
import { usePropertyContext } from "@/shared/store/PropertyProvider";

export function Home() {
  const { getList } = usePropertyContext();
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="flex flex-col p-5">
      <Tabs defaultValue="list">
        <div className="flex justify-center items-center">
          <TabsList className="grid max-w-lg grid-cols-2">
            <TabsTrigger value="list">Property List</TabsTrigger>
            <TabsTrigger value="map">Property Map</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="list" className="p-5">
          <div className="text-bold">List of Properties</div>
          <ListProperty />
        </TabsContent>
        <TabsContent value="map" className="p-5">
          <div className="text-bold">List of Properties</div>
          <ViewMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
