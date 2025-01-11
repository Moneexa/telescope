import { Carousels } from "./components/Carousels";
import { Information } from "./components/Information";
import { InformationalPanelProps } from "./types";

export function InformationPanel({
  infoData,
  images,
}: InformationalPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-6">
      <Information infoDataFields={infoData} />
      <Carousels images={images} />
    </div>
  );
}
