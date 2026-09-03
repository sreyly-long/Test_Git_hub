export const settingsNavItems = [
  { slug: "general", label: "General", icon: "settings" as const },
  { slug: "hotel-information", label: "Hotel Information", icon: "building" as const },
  { slug: "localization", label: "Localization", icon: "globe" as const },
  { slug: "rooms-pricing", label: "Rooms & Pricing", icon: "bed" as const },
  { slug: "taxes-fees", label: "Taxes & Fees", icon: "tag" as const },
  { slug: "payment-methods", label: "Payment Methods", icon: "creditCard" as const },
  { slug: "notifications", label: "Notifications", icon: "bell" as const },
  { slug: "users-roles", label: "Users & Roles", icon: "users" as const },
  { slug: "security", label: "Security", icon: "shield" as const },
  { slug: "integrations", label: "Integrations", icon: "plug" as const },
  { slug: "backup-restore", label: "Backup & Restore", icon: "archive" as const },
];

export const primaryColors = [
  { name: "blue", hex: "#2a78d6" },
  { name: "sky", hex: "#1c9be0" },
  { name: "violet", hex: "#7c5cd6" },
  { name: "green", hex: "#0ca30c" },
  { name: "orange", hex: "#eda100" },
  { name: "red", hex: "#e34948" },
];

export const systemPreferences = [
  { label: "Enable maintenance mode", enabled: false },
  { label: "Allow guest registration", enabled: true },
  { label: "Enable housekeeping notifications", enabled: true },
  { label: "Automatically log out inactive users", enabled: false },
  { label: "Show tutorial tips", enabled: true },
];
