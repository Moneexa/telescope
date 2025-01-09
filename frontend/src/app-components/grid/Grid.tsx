import {
  InformationCard,
  InformationCardProps,
} from "@/app-components/grid/information-card/InformationCard";

type GenericGridProps<T> = {
  data: T[];
  keyExtractor: (item: T) => string | number;
  cardPropsExtractor: (item: T) => InformationCardProps; // Extract props for the card
};

export function InformationGrid<T>({
  data,
  keyExtractor,
  cardPropsExtractor,
}: GenericGridProps<T>) {
  return (
    <div
      className={`py-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}
    >
      {data.map((item) => (
        <div key={keyExtractor(item)}>
          <InformationCard {...cardPropsExtractor(item)} />
        </div>
      ))}
    </div>
  );
}
