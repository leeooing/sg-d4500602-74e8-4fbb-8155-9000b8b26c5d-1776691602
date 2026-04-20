import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, phone, date, time, adults, children, service, notes } = req.body;

      // Validate required fields
      if (!name || !phone || !date || !time || !adults || !service) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Generate booking code
      const bookingCode = Math.random().toString(36).substring(2, 6).toUpperCase();

      const booking = await prisma.booking.create({
        data: {
          bookingCode,
          name,
          phone,
          date,
          time,
          adults,
          children: children || "0",
          service,
          notes: notes || "",
          status: "pending",
        },
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ error: "Failed to create booking" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}