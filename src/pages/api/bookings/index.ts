import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Note: This endpoint now expects localStorage operations to happen on client-side
  // For server-side API, we'll return a message to use client-side storage
  
  if (req.method === "POST") {
    try {
      const { name, phone, date, time, adults, children, service, notes, items } = req.body;

      // Validation
      if (!name || !phone || !date || !time || !adults || !service) {
        return res.status(400).json({ 
          message: "Missing required fields",
          required: ["name", "phone", "date", "time", "adults", "service"]
        });
      }

      // Generate booking code on server
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let bookingCode = "SC-";
      for (let i = 0; i < 6; i++) {
        bookingCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Return data for client to save in localStorage
      return res.status(201).json({
        bookingCode,
        booking: {
          name,
          phone,
          date,
          time,
          adults: parseInt(adults),
          children: parseInt(children || 0),
          service,
          notes: notes || null,
          items: items || [],
          status: "pending",
        }
      });
    } catch (error) {
      console.error("Create booking error:", error);
      return res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  } else if (req.method === "GET") {
    // For GET requests, client should read from localStorage
    return res.status(200).json({ 
      message: "Use localStorage on client-side",
      key: "samcamping_bookings"
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}