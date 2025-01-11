import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { GenericForm } from "@/shared/components/form/GenericForm";
import { Button } from "@/components/ui/button";
import { fieldMeta } from "@/pages/add-property/utils/formFieldUtils";
import {
  FormSchema,
  formSchema,
  defaultValues,
} from "@/pages/add-property/utils/formSchemaUtils";
import { MapProvider } from "@/shared/components/MapProvider";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { postPropertyItem } from "@/shared/apis/apis";
import { getPinAddress } from "@/pages/add-property/utils/mapUtils";

export function PropertyForm() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { addPropertyItemInList } = usePropertyContext();
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = form;

  const handleSelectLocationOnMap = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    const pinAddressData = await getPinAddress({ lat, lng });
    if (!pinAddressData) return;
    const { address, city, zipCode, coordinates } = pinAddressData;
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
    const propertyResponse = await postPropertyItem(values);
    if (propertyResponse.status === "success") {
      toast({
        title: "Property added successfully",
        description: "The property has been added to the list.",
        variant: "default",
        duration: 1000,
      });
      addPropertyItemInList(propertyResponse.data);
      navigate(`/view-property/${propertyResponse.data.id}`);
    } else {
      toast({
        title: "Error",
        description:
          "There was an error,." +
          (propertyResponse.status === "error" && propertyResponse.error),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="py-5">
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <GenericForm fields={fieldMeta} control={control} />
            <Button disabled={!isValid} type="submit">
              Submit
            </Button>
          </form>
          <div className="min-h-80">
            <MapProvider
              onLocationSelect={handleSelectLocationOnMap}
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
    </div>
  );
}
