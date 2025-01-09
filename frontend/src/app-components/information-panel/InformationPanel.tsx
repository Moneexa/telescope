import { Carousels } from "./components/Carousels";
import { Information } from "./components/Information";

type InformationalPanelProps<T> = {
  infoData: T; // The data object for the left section
  infoFields: Array<{ label: string; key: keyof T }>; // Fields to display in the left section
  images: string[]; // Images to display in the carousel
};

export function InformationPanel<T>({
  infoData,
  infoFields,
  images,
}: InformationalPanelProps<T>) {
  return (
    <div className="flex flex-row justify-around gap-6 flex-wrap p-5">
      <Information infoData={infoData} infoFields={infoFields} />
      <Carousels images={images} />
    </div>
  );
}
