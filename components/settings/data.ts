export const settingsNavItems = [
  { label: "General", icon: "settings" as const, active: true },
  { label: "Hotel Information", icon: "building" as const, active: false },
  { label: "Localization", icon: "globe" as const, active: false },
  { label: "Rooms & Pricing", icon: "bed" as const, active: false },
  { label: "Taxes & Fees", icon: "tag" as const, active: false },
  { label: "Payment Methods", icon: "creditCard" as const, active: false },
  { label: "Notifications", icon: "bell" as const, active: false },
  { label: "Users & Roles", icon: "users" as const, active: false },
  { label: "Security", icon: "shield" as const, active: false },
  { label: "Integrations", icon: "plug" as const, active: false },
  { label: "Backup & Restore", icon: "archive" as const, active: false },
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
