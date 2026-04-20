import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid booking ID" });
  }

  if (req.method === "GET") {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
      });

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      return res.status(500).json({ error: "Failed to fetch booking" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: req.body,
      });

      return res.status(200).json(booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      return res.status(500).json({ error: "Failed to update booking" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.booking.delete({
        where: { id },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting booking:", error);
      return res.status(500).json({ error: "Failed to delete booking" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}