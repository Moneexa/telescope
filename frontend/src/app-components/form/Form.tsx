import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormInput } from "./FormInputs";

type FieldMap<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type: string;
}[];
export function GenericForm<T extends FieldValues>({
  fields,
  control,
}: {
  fields: FieldMap<T>;
  control: Control<T>;
}) {
  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ name, label, placeholder, type }) => (
        <FormInput
          name={name}
          label={label}
          placeholder={placeholder}
          type={type}
          control={control}
        />
      ))}
    </div>
  );
}
