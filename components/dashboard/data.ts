export type StatCard = {
  label: string;
  value: string;
  deltaPct: number;
  direction: "up" | "down";
};

export type RoomOccupancySegment = {
  label: string;
  value: number;
  color: string;
};

export type RatingBreakdown = {
  label: string;
  score: number;
};

export type Booking = {
  id: string;
  guest: string;
  roomType: string;
  roomNo: string;
  duration: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

export type Activity = {
  title: string;
  detail: string;
  time: string;
  kind: "user" | "booking" | "payment";
};
