import Image from "next/image";

const palette = [
  "bg-[#2a78d6]/10 text-[#184f95]",
  "bg-[#0ca30c]/10 text-[#006300]",
  "bg-[#eda100]/15 text-[#8a5a00]",
  "bg-[#4a3aa7]/10 text-[#4a3aa7]",
  "bg-[#e34948]/10 text-[#d03b3b]",
  "bg-[#1baf7a]/10 text-[#0f6b4a]",
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  avatarUrl,
  className = "h-9 w-9",
}: {
  name: string;
  avatarUrl?: string | null;
  className?: string;
}) {
  if (avatarUrl) {
    return (
      <span className={`relative shrink-0 overflow-hidden rounded-full ${className}`}>
        <Image src={avatarUrl} alt={name} fill sizes="48px" className="object-cover" />
      </span>
    );
  }

  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const theme = palette[hash % palette.length];

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full text-xs font-semibold ${theme} ${className}`}
    >
      {initialsOf(name)}
    </span>
  );
}
