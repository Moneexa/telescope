type InformationProps<T> = {
  infoData: T; // The data object for the left section
  infoFields: Array<{ label: string; key: keyof T }>; // Fields to display in the left section
};
export function Information<T>({ infoData, infoFields }: InformationProps<T>) {
  return (
    <div className="flex-grow">
      <div className="flex flex-col gap-4">
        {infoFields.map((field) => (
          <div key={String(field.key)}>
            <div className="font-bold">{field.label}:</div>
            <div>{String(infoData[field.key])}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
