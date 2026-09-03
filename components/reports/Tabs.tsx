import Link from "next/link";
import { reportTabs } from "./data";

export function Tabs({ activeType }: { activeType?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#e1e0d9] bg-white p-1.5">
      {reportTabs.map((tab) => {
        const isActive = tab === "All Reports" ? !activeType : activeType === tab;
        return (
          <Link
            key={tab}
            href={tab === "All Reports" ? "/reports" : `/reports?type=${encodeURIComponent(tab)}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-[#2a78d6] text-white" : "text-[#52514e] hover:bg-black/[.04]"
            }`}
          >
            {tab}
          </Link>
        );
      })}
    </div>
  );
}
