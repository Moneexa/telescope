import { Card, CardContent } from "@/components/ui/card";
import image from "@/assets/file.png";

export function PropertyCard({
  name,
  financialRisk,
  ratio,
}: {
  name: string;
  financialRisk: number;
  ratio: string;
}) {
  return (
    <Card className="flex flex-col h-full justify-center align-center">
      <CardContent>
        <img src={image} className="w-full h-48 object-cover" />
        <div className="text-lg font-bold">{name}</div>
        <div>Financial Risk:{financialRisk}</div>
        <div>Ratio of Handled Risks over Relevant Risks: {ratio}</div>
      </CardContent>
    </Card>
  );
}
