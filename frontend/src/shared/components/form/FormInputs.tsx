// FormInput.tsx
import { Controller, FieldValues, Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type: string;
  control: Control<T>;
  className?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control,
  className,
}: FormInputProps<T>) {
  return (
    <FormItem className={className}>
      <FormLabel className="text-start">{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input type={type} placeholder={placeholder} {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
