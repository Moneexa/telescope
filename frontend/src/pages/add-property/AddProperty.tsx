import { PropertyForm } from "./PropertyForm";

export function AddProperty() {
  return (
    <div className="flex flex-col p-5">
      <div className="text-bold">Register Your Property...</div>
      <PropertyForm />
    </div>
  );
}
