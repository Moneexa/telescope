import { Card, CardContent } from "@/components/ui/card";
import home from "@/assets/home1.png";
import { Link } from "react-router-dom";

export type InformationCardProps = {
  imageUrl?: string; // Optional image URL
  title: string; // Card title
  subtitle?: string; // Optional subtitle or description
  details?: React.ReactNode; // Additional details as React nodes
  link: string;
};

export function InformationCard({
  title,
  subtitle,
  details,
  link,
}: InformationCardProps) {
  return (
    <Link to={link}>
      <Card className="flex flex-col h-full justify-center align-center">
        <CardContent>
          <img src={home} className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="text-lg font-bold">{title}</div>
            {subtitle && (
              <div className="text-sm text-gray-600">{subtitle}</div>
            )}
            {details && (
              <div className="mt-2 text-md text-stone-600">{details}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
