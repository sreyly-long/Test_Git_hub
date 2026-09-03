import { Donut, type DonutSlice } from "./Donut";

export function PlatformDonut({
  slices,
  totalSubLabel,
}: {
  slices: DonutSlice[];
  totalSubLabel: string;
}) {
  return <Donut slices={slices} totalLabel="Total Bookings" totalSubLabel={totalSubLabel} />;
}
