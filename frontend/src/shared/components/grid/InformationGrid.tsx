import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import home from "@/assets/home1.png";

export type GenericGridProps = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  link: string;
}[];

export function InformationGrid({ property }: { property: GenericGridProps }) {
  return (
    <div
      className={`py-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}
    >
      {property.map((propertyItem) => {
        return (
          <div key={propertyItem.id}>
            <Link to={propertyItem.link}>
              <Card className="flex flex-col h-full align-center">
                <CardContent>
                  <img src={home} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="text-lg font-bold">
                      {propertyItem.title}
                    </div>
                    {propertyItem.subtitle && (
                      <div className="text-sm text-gray-600">
                        {propertyItem.subtitle}
                      </div>
                    )}
                    {propertyItem.details && (
                      <div className="mt-2 text-md text-stone-600">
                        {propertyItem.details}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
