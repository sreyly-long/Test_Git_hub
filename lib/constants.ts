export const ROOM_TYPES = ["Deluxe", "Superior", "Suite", "Standard"] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_STATUSES = ["Available", "Occupied", "Reserved", "Maintenance"] as const;
export type RoomStatus = (typeof ROOM_STATUSES)[number];

export const ROOM_FEATURES = ["wifi", "tv", "ac", "coffee", "bath"] as const;
export type RoomFeature = (typeof ROOM_FEATURES)[number];

export const RESERVATION_STATUSES = ["Confirmed", "Checked In", "Pending", "Checked Out", "Cancelled"] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const BOOKING_SOURCES = ["Direct", "Booking.com", "Agoda", "Airbnb", "Hotels.com", "TripAdvisor", "Traveloka"] as const;
export type BookingSource = (typeof BOOKING_SOURCES)[number];

export const STAFF_STATUSES = ["Active", "On Leave", "Inactive"] as const;
export type StaffStatus = (typeof STAFF_STATUSES)[number];

export const STAFF_DEPARTMENTS = ["Management", "Front Office", "Housekeeping", "Maintenance"] as const;

export const REVIEW_SOURCES = ["Booking.com", "Agoda", "Hotels.com", "TripAdvisor"] as const;
export type ReviewSource = (typeof REVIEW_SOURCES)[number];

export const INVOICE_STATUSES = ["Paid", "Pending", "Overdue"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const PAYMENT_METHODS = ["visa", "mastercard", "bank", "paypal", "cash"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const REPORT_TYPES = ["Reservation", "Revenue", "Rooms", "Guests", "Staff", "Finance"] as const;
export type ReportType = (typeof REPORT_TYPES)[number];
