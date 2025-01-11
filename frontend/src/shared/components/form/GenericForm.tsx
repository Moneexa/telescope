import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormInput } from "@/shared/components/form/FormInputs";

type FieldMap<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type: string;
  className?: string;
}[];
export function GenericForm<T extends FieldValues>({
  fields,
  control,
}: {
  fields: FieldMap<T>;
  control: Control<T>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(({ name, label, placeholder, type, className }) => {
        if (type === "text" || type === "number") {
          return (
            <FormInput
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              control={control}
              className={className}
            />
          );
        }
      })}
    </div>
  );
}
