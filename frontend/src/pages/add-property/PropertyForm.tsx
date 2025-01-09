import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { GenericForm } from "@/app-components/form/Form";
import { Button } from "@/components/ui/button";
import { fieldMeta } from "@/pages/add-property/utils/formFieldUtils";
import {
  FormSchema,
  formSchema,
  defaultValues,
} from "@/pages/add-property/utils/formSchemaUtils";
import { MapProvider } from "@/shared/map-provider/Map";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { handleLocationSelect } from "@/pages/add-property/utils/mapUtils";
import { Form } from "@/components/ui/form";

export function PropertyForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();

  const { control, handleSubmit, setValue } = form;
  const handleMapLocationSelect = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    const mapValues = await handleLocationSelect({ coordinates: { lat, lng } });
    if (!mapValues) return;
    const { address, city, zipCode, coordinates } = mapValues;
    setValue("address", address);
    setValue("city", city);
    setValue("zipCode", zipCode);

    setValue("latitude", coordinates.lat);
    setValue("longitude", coordinates.lng);
    setLocation({ lat: coordinates.lat, lng: coordinates.lng });
    console.log(address, city, zipCode);
  };

  async function onSubmit(values: FormSchema) {
    console.log(values);
    try {
      const propertyDataPostResponse = await fetch("/api/properties/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (propertyDataPostResponse.ok) {
        toast({
          title: "Property added successfully",
          description: "The property has been added to the list.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error,." +
          (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    }
  }

  const mySubmit = handleSubmit(onSubmit, (e) => {
    setErrorMsg(JSON.stringify(e));
  });

  return (
    <div className="py-5">
      <Form {...form}>
        <div className="flex flex-wrap gap-8">
          <form onSubmit={mySubmit} className="space-y-8 grow-[1]">
            <GenericForm fields={fieldMeta} control={control} />
            <Button type="submit">Submit</Button>
          </form>
          <div className="grow-[2] min-w-80 min-h-80">
            <MapProvider
              onLocationSelect={handleMapLocationSelect}
              locations={[
                {
                  key: "1",
                  location: {
                    lat: location.lat || defaultValues.latitude,
                    lng: location.lng || defaultValues.longitude,
                  },
                },
              ]}
            />
          </div>
        </div>
      </Form>
      {errorMsg && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      <Toaster />
    </div>
  );
}
