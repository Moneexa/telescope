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
import { valueAssessmentFromAI } from "@/shared/apis/apis";

import { MapProvider } from "@/shared/components/MapProvider";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { postPropertyItem } from "@/shared/apis/apis";
import { getPinAddress } from "@/pages/add-property/utils/mapUtils";
import { Response } from "@/types";
import { SparklesIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function PropertyForm() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [propertyValue, setPropertyValue] = useState<Response<string>>();

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

  async function getAIEstimation() {
    setPropertyValue({ status: "loading" });
    const vals = await getPinAddress({ lat: location.lat, lng: location.lng });
    if (vals) {
      const risk = await valueAssessmentFromAI(vals);

      setPropertyValue(risk);
    }
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GenericForm fields={fieldMeta} control={control} />
              {location.lat !== 0.0 && location.lng != 0.0 && (
                <div className="col-span-1 flex items-end pb-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <SparklesIcon onClick={() => getAIEstimation()} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription>
                          {propertyValue?.status === "success" &&
                            propertyValue.data}
                          {propertyValue?.status === "error" &&
                            propertyValue.error}
                          {propertyValue?.status === "loading" &&
                            "... Waiting for AI for estimated value"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
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
