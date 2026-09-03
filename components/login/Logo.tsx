export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-2xl font-extrabold tracking-tight ${className}`}>
      <span className="text-[#2a78d6]">coo</span>
      <span className="text-[#12172b]">con</span>
    </span>
  );
}
