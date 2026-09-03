export type BarListItem = {
  label: string;
  value: string;
  percent: number;
};

export function BarList({ items }: { items: BarListItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 text-xs">
          <span className="w-20 shrink-0 text-[#52514e]">{item.label}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e1e0d9]">
            <span
              className="block h-full rounded-full bg-[#2a78d6]"
              style={{ width: `${item.percent}%` }}
            />
          </span>
          <span className="w-14 shrink-0 text-right font-medium text-[#0b0b0b]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
