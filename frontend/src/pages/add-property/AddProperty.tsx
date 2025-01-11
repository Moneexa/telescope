import { PropertyForm } from "./PropertyForm";

export function AddProperty() {
  return (
    <div className="flex flex-col py-1 px-5">
      <div className="text-3xl">Property Registration</div>
      <PropertyForm />
    </div>
  );
}
