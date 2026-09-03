type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3.2 5.5 10 11l6.8-5.5" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="4" y="9" width="12" height="8.5" rx="2" />
      <path d="M6.3 9V6.5a3.7 3.7 0 0 1 7.4 0V9" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.6 16.5 5v4.4c0 4.2-2.7 7-6.5 8.4-3.8-1.4-6.5-4.2-6.5-8.4V5L10 2.6Z" />
      <path d="M7.3 10.1l1.9 1.9 3.6-3.8" />
    </svg>
  );
}
