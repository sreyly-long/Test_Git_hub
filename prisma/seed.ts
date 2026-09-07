import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import {
  ROOM_TYPES,
  RESERVATION_STATUSES,
  BOOKING_SOURCES,
  STAFF_DEPARTMENTS,
  REVIEW_SOURCES,
  INVOICE_STATUSES,
  PAYMENT_METHODS,
} from "../lib/constants";

const prisma = new PrismaClient();

const GUEST_NAMES = [
  "James Liboon", "Sophia Martinez", "Daniel Kim", "Olivia Brown", "William Johnson",
  "Ava Wilson", "Ethan Davis", "Isabella Taylor", "Noah Bennett", "Mia Anderson",
  "Lucas Thompson", "Charlotte Lewis", "Henry Walker", "Amelia Hall", "Benjamin Young",
  "Harper Allen", "Sebastian King", "Evelyn Wright", "Jack Scott", "Ella Green",
];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

const ROOM_PRICE: Record<string, number> = {
  Deluxe: 120,
  Superior: 150,
  Suite: 220,
  Standard: 95,
};

const ROOM_CAPACITY: Record<string, number> = {
  Deluxe: 2,
  Superior: 2,
  Suite: 4,
  Standard: 2,
};

const ROOM_FEATURES: Record<string, string> = {
  Deluxe: "wifi,tv,ac,coffee",
  Superior: "wifi,tv,ac,coffee",
  Suite: "wifi,tv,ac,coffee,bath",
  Standard: "wifi,tv",
};

async function main() {
  console.log("Seeding database...");

  await prisma.session.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.report.deleteMany();
  await prisma.scheduledReport.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hashPassword("password123");
  await prisma.user.createMany({
    data: [
      { name: "Zain George", email: "admin@hostay.com", passwordHash, role: "Admin" },
      { name: "Amara Chen", email: "manager@hostay.com", passwordHash, role: "Manager" },
      { name: "Liam Brooks", email: "frontdesk@hostay.com", passwordHash, role: "Front Desk" },
    ],
  });

  await prisma.settings.create({ data: { id: "singleton" } });

  const rooms = [];
  let roomCounter = 0;
  for (let floor = 1; floor <= 4; floor++) {
    for (let unit = 1; unit <= 4; unit++) {
      const roomType = pick(ROOM_TYPES, roomCounter);
      const number = `${floor}${String(unit).padStart(2, "0")}`;
      const room = await prisma.room.create({
        data: {
          number,
          name: `${roomType} Room`,
          roomType,
          floor,
          status: roomCounter % 5 === 0 ? "Maintenance" : roomCounter % 3 === 0 ? "Reserved" : roomCounter % 2 === 0 ? "Occupied" : "Available",
          pricePerNight: ROOM_PRICE[roomType],
          capacity: ROOM_CAPACITY[roomType],
          features: ROOM_FEATURES[roomType],
        },
      });
      rooms.push(room);
      roomCounter++;
    }
  }

  let bookingCounter = 100;
  const reservations = [];
  for (let i = 0; i < 60; i++) {
    const room = pick(rooms, i * 7 + 3);
    const guestName = pick(GUEST_NAMES, i * 3 + 1);
    const nights = 1 + (i % 5);
    const checkIn = daysAgo(89 - i * 1.4);
    const checkOut = addDays(checkIn, nights);
    const status = pick(RESERVATION_STATUSES, i * 5 + 2);
    const source = pick(BOOKING_SOURCES, i * 2 + 1);
    bookingCounter++;

    const reservation = await prisma.reservation.create({
      data: {
        bookingCode: `BKG-${bookingCounter}`,
        guestName,
        guestEmail: `${guestName.toLowerCase().replace(/\s+/g, ".")}@email.com`,
        roomId: room.id,
        checkIn,
        checkOut,
        guests: 1 + (i % room.capacity),
        totalAmount: room.pricePerNight * nights,
        status,
        source,
      },
    });
    reservations.push(reservation);
  }

  let invoiceCounter = 200;
  for (let i = 0; i < 45; i++) {
    const reservation = pick(reservations, i * 4 + 2);
    const room = rooms.find((r) => r.id === reservation.roomId)!;
    const status = pick(INVOICE_STATUSES, i * 3 + 1);
    const method = pick(PAYMENT_METHODS, i * 5 + 2);
    invoiceCounter++;

    await prisma.invoice.create({
      data: {
        invoiceCode: `INV-${invoiceCounter}`,
        reservationId: reservation.id,
        roomId: room.id,
        guestName: reservation.guestName,
        guestEmail: reservation.guestEmail,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        amount: reservation.totalAmount,
        paymentMethod: method,
        paymentDetail: method === "paypal" ? reservation.guestEmail : method === "cash" ? "" : `•••• ${1000 + (i * 37) % 9000}`,
        status,
        issueDate: reservation.checkIn,
        dueDate: status === "Overdue" ? addDays(reservation.checkIn, 7) : addDays(reservation.checkIn, status === "Pending" ? 5 : 0),
      },
    });
  }

  const reviewTexts = [
    "Excellent stay! The room was clean, comfortable, and the staff was very friendly.",
    "Amazing experience! Great location and beautiful room. Will come again.",
    "Very good hotel. Everything was perfect except the Wi-Fi was a bit slow.",
    "Perfect weekend getaway! Staff was helpful and the breakfast was delicious.",
    "Room was okay, but noise from outside was annoying at night.",
    "Loved the pool area and the friendly front desk team.",
    "Good value for the price, would recommend to friends.",
    "Room was smaller than expected but very clean and quiet.",
  ];

  for (let i = 0; i < 30; i++) {
    const room = pick(rooms, i * 6 + 5);
    const guestName = pick(GUEST_NAMES, i * 4 + 2);
    const rating = [5, 5, 4, 5, 3, 4, 5, 2][i % 8];

    await prisma.review.create({
      data: {
        guestName,
        guestEmail: `${guestName.toLowerCase().replace(/\s+/g, ".")}@email.com`,
        roomId: room.id,
        rating,
        reviewText: pick(reviewTexts, i),
        source: pick(REVIEW_SOURCES, i * 3 + 1),
        date: daysAgo(60 - i * 2),
      },
    });
  }

  const staffSeed = [
    { name: "Zain George", role: "Admin", department: "Management", status: "Active" },
    { name: "Sarah Johnson", role: "Front Desk", department: "Front Office", status: "Active" },
    { name: "Michael Brown", role: "Housekeeping", department: "Housekeeping", status: "Active" },
    { name: "Emily Davis", role: "Maintenance", department: "Maintenance", status: "On Leave" },
    { name: "David Wilson", role: "Front Desk", department: "Front Office", status: "Active" },
    { name: "Jessica Taylor", role: "Housekeeping", department: "Housekeeping", status: "Inactive" },
    { name: "Daniel Martinez", role: "Maintenance", department: "Maintenance", status: "Active" },
    { name: "Laura Anderson", role: "Front Desk", department: "Front Office", status: "Active" },
  ];

  for (let i = 0; i < staffSeed.length; i++) {
    const s = staffSeed[i];
    await prisma.staff.create({
      data: {
        staffCode: `STF${String(i + 1).padStart(3, "0")}`,
        name: s.name,
        role: s.role,
        department: s.department ?? pick(STAFF_DEPARTMENTS, i),
        status: s.status,
        phone: `+1 234 567 ${890 + i}`,
        email: `${s.name.toLowerCase().replace(/\s+/g, ".")}@hostay.com`,
      },
    });
  }

  await prisma.scheduledReport.createMany({
    data: [
      { name: "Revenue Report", cadence: "Every Monday at 8:00 AM", enabled: true },
      { name: "Occupancy Report", cadence: "Every Monday at 8:00 AM", enabled: true },
      { name: "Reservation Report", cadence: "Every day at 8:00 AM", enabled: false },
    ],
  });

  await prisma.report.createMany({
    data: [
      { name: "Reservation Summary", type: "Reservation", description: "Summary of all reservations", dateStart: daysAgo(30), dateEnd: daysAgo(0), generatedOn: daysAgo(0) },
      { name: "Revenue Report", type: "Revenue", description: "Detailed revenue breakdown", dateStart: daysAgo(30), dateEnd: daysAgo(0), generatedOn: daysAgo(0) },
      { name: "Occupancy Report", type: "Rooms", description: "Room occupancy statistics", dateStart: daysAgo(30), dateEnd: daysAgo(0), generatedOn: daysAgo(1) },
      { name: "Guest Report", type: "Guests", description: "Guest check-in and overview", dateStart: daysAgo(30), dateEnd: daysAgo(0), generatedOn: daysAgo(1) },
    ],
  });

  console.log("Seed complete.");
  console.log("Login with: admin@hostay.com / password123");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
