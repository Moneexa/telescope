import { InformationProps } from "@/shared/components/information-panel/types";

export function Information({
  infoDataFields,
}: {
  infoDataFields: InformationProps;
}) {
  return (
    <div className="grid grid-rows-4 lg:grid-rows-6 gap-4">
      {infoDataFields.map((item, indx) => (
        <div key={String(indx)}>
          <div className="font-bold">{item.label}:</div>
          <div>{String(item.value)}</div>
        </div>
      ))}
    </div>
  );
}
