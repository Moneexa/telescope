import { usePropertyContext } from "@/shared/store/PropertyProvider";
import { useParams } from "react-router-dom";

export function ViewProperty() {
  const { id } = useParams();
  const { properties } = usePropertyContext();
  if (!id) {
    return <div>Invalid ID</div>;
  }
  if (properties.status === "loading") {
    return <div>Loading...</div>;
  } else if (properties.status === "error") {
    return <div>Error...</div>;
  }

  return (
    <div className="flex justify-between items-center h-screen">
      {properties.data.map((item) => {
        return (
          item.id === id && (
            <div key={item.id} className="flex flex-col">
              <div className="text-bold">{item.name}</div>
              <div>Address: {item.address}</div>
              <div>FinancialRisk: {item.totalFinancialRisk}</div>
              <div>
                Ratio: {item.noHandledRisks}/{item.noRelevantRisks}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
