import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { InformationGrid } from "@/app-components/grid/Grid";

export function ListProperty() {
  const { properties } = usePropertyContext();
  if (properties.status === "success") {
    return (
      <InformationGrid
        data={properties.data}
        keyExtractor={(item) => item.id}
        cardPropsExtractor={(item) => ({
          title: item.name,
          subtitle: `Financial Risk: ${item.totalFinancialRisk}`,
          details: `Ratio: ${item.noRelevantRisks}/${item.noHandledRisks}`,
          link: `/view-property/${item.id}`,
        })}
      />
    );
  }
}
