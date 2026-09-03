import { IconDownload } from "@/components/dashboard/icons";

export function Toolbar({ exportHref }: { exportHref: string }) {
  return (
    <div className="flex items-center justify-end">
      <a
        href={exportHref}
        className="flex items-center gap-2 rounded-xl border border-[#e1e0d9] bg-white px-4 py-2.5 text-sm text-[#52514e] hover:bg-black/[.02]"
      >
        <IconDownload className="h-4 w-4" />
        Export Report
      </a>
    </div>
  );
}
