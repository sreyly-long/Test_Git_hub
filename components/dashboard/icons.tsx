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

export function IconGrid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="2.5" width="6.2" height="6.2" rx="1.4" />
      <rect x="11.3" y="2.5" width="6.2" height="6.2" rx="1.4" />
      <rect x="2.5" y="11.3" width="6.2" height="6.2" rx="1.4" />
      <rect x="11.3" y="11.3" width="6.2" height="6.2" rx="1.4" />
    </svg>
  );
}

export function IconCalendarCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="3.5" width="15" height="14" rx="2" />
      <path d="M2.5 8h15" />
      <path d="M6.5 2v3M13.5 2v3" />
      <path d="M7 12.2l1.8 1.8L13 10" />
    </svg>
  );
}

export function IconBed({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2.5 15.5v-7a2 2 0 0 1 2-2H10a2 2 0 0 1 2 2v2" />
      <path d="M2.5 12.5H16a1.5 1.5 0 0 1 1.5 1.5v1.5" />
      <path d="M2.5 15.5h15" />
      <circle cx="5.6" cy="8.3" r="1.3" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="7.3" cy="6.3" r="2.6" />
      <path d="M2.6 17c0-2.6 2.1-4.3 4.7-4.3s4.7 1.7 4.7 4.3" />
      <path d="M13 5.2a2.6 2.6 0 0 1 0 5" />
      <path d="M14.6 12.8c2 .3 3.4 1.9 3.4 4.2" />
    </svg>
  );
}

export function IconBarChart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 17V9M8 17V3M13 17v-6M18 17V6" />
    </svg>
  );
}

export function IconFileText({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 2.5h7l4 4V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
      <path d="M12 2.5V7h4" />
      <path d="M6.8 10.5h6.4M6.8 13.2h6.4" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L10 14.6l-4.7 2.45.9-5.23-3.8-3.7 5.25-.76L10 2.6Z" />
    </svg>
  );
}

export function IconReceipt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 2.5h10v15l-1.8-1.2-1.8 1.2-1.8-1.2-1.8 1.2-1.8-1.2L5 17.5V2.5Z" />
      <path d="M7.2 6.5h5.6M7.2 9.5h5.6M7.2 12.5h3.4" />
    </svg>
  );
}

export function IconSettings({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="2.6" />
      <path d="M10 2.8v1.7M10 15.5v1.7M17.2 10h-1.7M4.5 10H2.8M15 4.9l-1.2 1.2M6.2 13.8l-1.2 1.2M15 15.1l-1.2-1.2M6.2 6.2 5 5" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="8.8" cy="8.8" r="5.3" />
      <path d="M16.5 16.5l-3.6-3.6" />
    </svg>
  );
}

export function IconBell({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 8.2a5 5 0 0 1 10 0c0 4 1.4 5 1.4 5H3.6s1.4-1 1.4-5Z" />
      <path d="M8.3 16.3a1.9 1.9 0 0 0 3.4 0" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2.8 10.2a6.7 6.7 0 1 1 3 5.6L2.8 17l1.1-3.3a6.6 6.6 0 0 1-1.1-3.5Z" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4.5 7.5 10 13l5.5-5.5" />
    </svg>
  );
}

export function IconMoreVertical({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" stroke="none">
      <circle cx="10" cy="4" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="10" cy="16" r="1.4" />
    </svg>
  );
}

export function IconArrowUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 15.5V4.5M5.5 9l4.5-4.5L14.5 9" />
    </svg>
  );
}

export function IconArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 4.5v11M5.5 11l4.5 4.5L14.5 11" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 9.5 10 3l7 6.5" />
      <path d="M4.8 8.3V17h10.4V8.3" />
      <path d="M8.2 17v-4.2h3.6V17" />
    </svg>
  );
}

export function IconCalendarPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="3.5" width="15" height="14" rx="2" />
      <path d="M2.5 8h15" />
      <path d="M10 11v4M8 13h4" />
    </svg>
  );
}

export function IconDollar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.5v15" />
      <path d="M13.5 5.8c0-1.3-1.6-2.3-3.5-2.3s-3.5 1-3.5 2.3S7.6 8 10 8s3.5 1 3.5 2.4-1.6 2.3-3.5 2.3-3.5-.9-3.5-2.3" />
    </svg>
  );
}

export function IconUserPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="8" cy="7" r="2.8" />
      <path d="M2.7 17c0-2.8 2.4-4.7 5.3-4.7s5.3 1.9 5.3 4.7" />
      <path d="M15.5 6v4.4M17.7 8.2h-4.4" />
    </svg>
  );
}

export function IconCheckCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M6.8 10.2l2.1 2.1 4.3-4.5" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M10 5.8V10l3 2" />
    </svg>
  );
}

export function IconXCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" />
    </svg>
  );
}

export function IconDollarCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M10 6v8" />
      <path d="M12.2 8c0-.9-1-1.6-2.2-1.6s-2.2.7-2.2 1.6.9 1.5 2.2 1.5 2.2.6 2.2 1.6-1 1.6-2.2 1.6-2.2-.7-2.2-1.6" />
    </svg>
  );
}

export function IconFilter({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 4.2h14M5.5 10h9M8.3 15.8h3.4" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 3v9.5M6.3 9.3l3.7 3.7 3.7-3.7" />
      <path d="M3.5 15v.8a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V15" />
    </svg>
  );
}

export function IconEye({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2 10s2.8-5.3 8-5.3S18 10 18 10s-2.8 5.3-8 5.3S2 10 2 10Z" />
      <circle cx="10" cy="10" r="2.3" />
    </svg>
  );
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

export function IconSwapHorizontal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 7h11.5M12.5 4l3 3-3 3" />
      <path d="M16 13H4.5M7.5 10l-3 3 3 3" />
    </svg>
  );
}

export function IconLifeBuoy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <circle cx="10" cy="10" r="3" />
      <path d="M4.9 4.9l3 3M15.1 4.9l-3 3M4.9 15.1l3-3M15.1 15.1l-3-3" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="4.5" y="2.5" width="11" height="15" rx="1.2" />
      <path d="M7.3 5.8h.01M10 5.8h.01M12.7 5.8h.01M7.3 8.8h.01M10 8.8h.01M12.7 8.8h.01M7.3 11.8h.01M10 11.8h.01M12.7 11.8h.01" />
      <path d="M8.3 17.5v-3.2h3.4v3.2" />
    </svg>
  );
}

export function IconWrench({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M13.4 3.3a3.7 3.7 0 0 0-4.9 4.4L3.3 12.9a1.7 1.7 0 0 0 2.4 2.4l5.2-5.2a3.7 3.7 0 0 0 4.4-4.9l-2.3 2.3-1.9-.5-.5-1.9 2.3-2.3Z" />
    </svg>
  );
}

export function IconWifi({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 7.8a10 10 0 0 1 14 0" />
      <path d="M5.6 10.6a6.3 6.3 0 0 1 8.8 0" />
      <path d="M8.2 13.4a2.7 2.7 0 0 1 3.6 0" />
      <path d="M10 16.2h.01" />
    </svg>
  );
}

export function IconMonitor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.5" y="3.5" width="15" height="9.5" rx="1.3" />
      <path d="M7 17h6M10 13v4" />
    </svg>
  );
}

export function IconSnowflake({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.5v15M3.3 6.2l13.4 7.6M16.7 6.2 3.3 13.8" />
      <path d="M10 2.5 8.2 4.3M10 2.5l1.8 1.8M10 17.5l-1.8-1.8M10 17.5l1.8-1.8" />
    </svg>
  );
}

export function IconCoffeeCup({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3.5 8.5h10v4a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-4Z" />
      <path d="M13.5 9.3h1.2a2.1 2.1 0 0 1 0 4.2h-1.2" />
      <path d="M6 6.3c0-1 .8-1 .8-2M9 6.3c0-1 .8-1 .8-2" />
    </svg>
  );
}

export function IconBath({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2.5 10.5h15v1.2a4 4 0 0 1-4 4H6.5a4 4 0 0 1-4-4v-1.2Z" />
      <path d="M4 10.5V6.8a1.8 1.8 0 0 1 3.1-1.3" />
      <path d="M5.5 15.7v1.3M14.5 15.7v1.3" />
    </svg>
  );
}

export function IconUsersDuo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="7.3" cy="6.6" r="2.3" />
      <path d="M3 16c0-2.2 1.9-3.7 4.3-3.7s4.3 1.5 4.3 3.7" />
      <circle cx="13.6" cy="7.4" r="1.7" />
      <path d="M12.2 12.6c1.9.2 3.3 1.4 3.3 3.4" />
    </svg>
  );
}

export function IconPencil({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M12.4 3.6 16.4 7.6 6.9 17.1H2.9v-4Z" />
      <path d="M10.8 5.2l3.9 4" />
    </svg>
  );
}

export function IconLogout({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M8.3 17H4.8a1.3 1.3 0 0 1-1.3-1.3V4.3A1.3 1.3 0 0 1 4.8 3h3.5" />
      <path d="M13 6.5 16.5 10 13 13.5" />
      <path d="M16.2 10H8" />
    </svg>
  );
}

export function IconUserX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="7.6" cy="6.6" r="2.8" />
      <path d="M2.6 17c0-2.8 2.2-4.7 5-4.7s5 1.9 5 4.7" />
      <path d="M13.8 7.3l3.2 3.2M17 7.3l-3.2 3.2" />
    </svg>
  );
}

export function IconTrendingUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M2.5 14.5 8 9l3.2 3.2 6.3-6.7" />
      <path d="M13.2 5.5h4.3v4.3" />
    </svg>
  );
}

export function IconPieChart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.6v7.4h7.4A7.4 7.4 0 1 1 10 2.6Z" />
      <path d="M12.5 2.9A7.4 7.4 0 0 1 17.1 7.5H12.5V2.9Z" />
    </svg>
  );
}

export function IconStarFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" stroke="none">
      <path d="M10 2.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L10 14.6l-4.7 2.45.9-5.23-3.8-3.7 5.25-.76L10 2.6Z" />
    </svg>
  );
}

export function IconToggleOn({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 20" className={className} fill="currentColor" stroke="none">
      <rect x="0" y="0" width="36" height="20" rx="10" />
      <circle cx="26" cy="10" r="8" fill="#fff" />
    </svg>
  );
}

export function IconToggleOff({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 20" className={className}>
      <rect x="0.5" y="0.5" width="35" height="19" rx="9.5" fill="#e1e0d9" stroke="none" />
      <circle cx="10" cy="10" r="8" fill="#fff" />
    </svg>
  );
}

export function IconInvoice({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 2.5h10v15l-2-1.3-1.8 1.3-1.8-1.3L7.6 17.5 5 16.2V2.5Z" />
      <path d="M7.2 6.3h5.6M7.2 9.3h5.6M7.2 12.3h3" />
    </svg>
  );
}

export function IconCreditCard({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2" y="4.5" width="16" height="11" rx="1.8" />
      <path d="M2 8h16" />
      <path d="M4.5 12h3" />
    </svg>
  );
}

export function IconBank({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.3 17.5 6.3H2.5L10 2.3Z" />
      <path d="M4 8.3v6.5M8 8.3v6.5M12 8.3v6.5M16 8.3v6.5" />
      <path d="M3 17h14" />
    </svg>
  );
}

export function IconCash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="1.8" y="5.3" width="16.4" height="9.4" rx="1.5" />
      <circle cx="10" cy="10" r="2.3" />
      <path d="M4.2 7.5h.01M15.8 12.5h.01" />
    </svg>
  );
}

export function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10.5 2.5h5a1 1 0 0 1 1 1v5L8 17 2 11l8.5-8.5Z" />
      <path d="M13.2 6.3h.01" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M2.7 10h14.6M10 2.7c1.9 2 3 4.6 3 7.3s-1.1 5.3-3 7.3c-1.9-2-3-4.6-3-7.3s1.1-5.3 3-7.3Z" />
    </svg>
  );
}

export function IconShieldLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 2.6 16.5 5v4.4c0 4.2-2.7 7-6.5 8.4-3.8-1.4-6.5-4.2-6.5-8.4V5L10 2.6Z" />
      <rect x="7.6" y="9.4" width="4.8" height="3.8" rx="0.8" />
      <path d="M8.4 9.4V8a1.6 1.6 0 0 1 3.2 0v1.4" />
    </svg>
  );
}

export function IconPlug({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M7 2.5v4M13 2.5v4" />
      <path d="M4.5 6.5h11v3a5.5 5.5 0 0 1-11 0v-3Z" />
      <path d="M10 14.5V18" />
    </svg>
  );
}

export function IconArchive({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <rect x="2.3" y="3" width="15.4" height="3.6" rx="1" />
      <path d="M3.3 6.6v8.4a1.5 1.5 0 0 0 1.5 1.5h10.4a1.5 1.5 0 0 0 1.5-1.5V6.6" />
      <path d="M8 10.3h4" />
    </svg>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 2.5v2M10 15.5v2M3.6 3.6l1.4 1.4M15 15l1.4 1.4M2.5 10h2M15.5 10h2M3.6 16.4 5 15M15 5l1.4-1.4" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M16.5 12.3A6.8 6.8 0 1 1 7.7 3.5a5.4 5.4 0 0 0 8.8 8.8Z" />
    </svg>
  );
}

export function IconTrash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3.5 5.5h13M8 5.5V3.8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.7" />
      <path d="M4.8 5.5 5.4 16a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.6-10.5" />
      <path d="M8.3 8.7v5M11.7 8.7v5" />
    </svg>
  );
}

export function IconCamera({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 7.3A1.3 1.3 0 0 1 4.3 6h1.9l.9-1.6c.2-.4.6-.6 1-.6h3.8c.4 0 .8.2 1 .6L13.8 6h1.9A1.3 1.3 0 0 1 17 7.3v7.4A1.3 1.3 0 0 1 15.7 16H4.3A1.3 1.3 0 0 1 3 14.7Z" />
      <circle cx="10" cy="10.8" r="2.9" />
    </svg>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}

export function IconAlertCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M10 6.3v4.4" />
      <path d="M10 13.6h.01" />
    </svg>
  );
}
