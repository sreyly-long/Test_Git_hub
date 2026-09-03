import { IconStarFilled } from "@/components/dashboard/icons";

export function Stars({ rating, className = "h-3.5 w-3.5" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <IconStarFilled
          key={i}
          className={`${className} ${i < rating ? "text-[#eda100]" : "text-[#e1e0d9]"}`}
        />
      ))}
    </div>
  );
}
