import { Link } from "react-router-dom";
import { PropertyCard } from "./property-card/PropertyCard";
import { usePropertyContext } from "@/shared/store/PropertyProvider";

export function ListProperty() {
  const { properties } = usePropertyContext();
  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return <div>Error...</div>;
  }
  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.data.map((item) => (
        <Link to={`/view-property/${item.id}`} key={item.id}>
          <PropertyCard
            name={item.name}
            financialRisk={item.totalFinancialRisk}
            ratio={`${item.noRelevantRisks}/${item.noHandledRisks}`}
          />
        </Link>
      ))}
    </div>
  );
}
