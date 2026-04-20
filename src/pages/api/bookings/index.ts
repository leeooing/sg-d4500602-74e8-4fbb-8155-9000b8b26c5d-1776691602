import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

function generateBookingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "SC-"; // SamCamping prefix
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, phone, date, time, adults, children, service, notes } = req.body;

      // Validation
      if (!name || !phone || !date || !time || !adults || !service) {
        return res.status(400).json({ 
          message: "Missing required fields",
          required: ["name", "phone", "date", "time", "adults", "service"]
        });
      }

      const bookingCode = generateBookingCode();

      const booking = await prisma.booking.create({
        data: {
          bookingCode,
          name,
          phone,
          date,
          time,
          adults: parseInt(adults),
          children: parseInt(children || 0),
          service,
          notes: notes || null,
          status: "pending",
        },
      });

      return res.status(201).json({
        id: booking.id,
        bookingCode: booking.bookingCode,
      });
    } catch (error) {
      console.error("Create booking error:", error);
      return res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else if (req.method === "GET") {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          items: true,
        },
      });
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}