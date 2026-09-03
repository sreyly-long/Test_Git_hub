import type { RoomFeature } from "@/lib/constants";

export type RoomStatTheme = "blue" | "green" | "orange" | "red";

export function thumbThemeForRoomType(roomType: string): RoomStatTheme {
  switch (roomType) {
    case "Deluxe":
      return "blue";
    case "Superior":
      return "orange";
    case "Suite":
      return "green";
    default:
      return "red";
  }
}

export function parseFeatures(features: string): RoomFeature[] {
  return features.split(",").filter(Boolean) as RoomFeature[];
}
