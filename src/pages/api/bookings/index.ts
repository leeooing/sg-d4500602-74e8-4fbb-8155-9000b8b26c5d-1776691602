import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

function generateBookingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "SC-";
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
      console.log("=== CREATE BOOKING REQUEST ===");
      console.log("Body:", req.body);
      
      const { name, phone, date, time, adults, children, service, notes } = req.body;

      // Validation
      if (!name || !phone || !date || !time || !adults || !service) {
        console.error("Missing required fields:", { name, phone, date, time, adults, service });
        return res.status(400).json({ 
          message: "Missing required fields",
          received: { name, phone, date, time, adults, service },
          required: ["name", "phone", "date", "time", "adults", "service"]
        });
      }

      const bookingCode = generateBookingCode();
      console.log("Generated booking code:", bookingCode);

      const bookingData = {
        bookingCode,
        name,
        phone,
        date,
        time,
        adults: typeof adults === 'string' ? parseInt(adults) : adults,
        children: typeof children === 'string' ? parseInt(children || "0") : (children || 0),
        service,
        notes: notes || null,
        status: "pending",
      };

      console.log("Creating booking with data:", bookingData);

      const booking = await prisma.booking.create({
        data: bookingData,
      });

      console.log("Booking created:", booking);

      return res.status(201).json({
        id: booking.id,
        bookingCode: booking.bookingCode,
      });
    } catch (error) {
      console.error("=== CREATE BOOKING ERROR ===");
      console.error("Error:", error);
      console.error("Error name:", error instanceof Error ? error.name : "Unknown");
      console.error("Error message:", error instanceof Error ? error.message : "Unknown");
      
      return res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined
      });
    }
  } else if (req.method === "GET") {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      return res.status(500).json({ 
        message: "Failed to fetch bookings",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}