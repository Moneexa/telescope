import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { InformationGrid } from "@/shared/components/grid/InformationGrid";

export function ListProperty() {
  const { properties } = usePropertyContext();
  if (properties.status === "success") {
    const property = properties.data.map((prop) => ({
      id: prop.id,
      title: prop.name,
      subtitle: `Financial Risk: ${prop.totalFinancialRisk}`,
      details: `Ratio: ${prop.noRelevantRisks}/${prop.noHandledRisks}`,
      link: `/view-property/${prop.id}`,
    }));
    return (
      <div>
        <InformationGrid property={property} />
      </div>
    );
  }
}
