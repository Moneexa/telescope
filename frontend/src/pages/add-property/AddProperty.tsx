import { PropertyForm } from "./PropertyForm";

export function AddProperty() {
  return (
    <div className="flex flex-col p-5">
      <div className="text-3xl">Register Your Property...</div>
      <PropertyForm />
    </div>
  );
}
