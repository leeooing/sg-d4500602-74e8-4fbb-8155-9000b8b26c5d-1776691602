import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tables = await prisma.table.findMany({
        orderBy: { name: "asc" },
      });
      return res.status(200).json(tables);
    } catch (error) {
      console.error("Error fetching tables:", error);
      return res.status(500).json({ error: "Failed to fetch tables" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, capacity } = req.body;

      if (!name || !capacity) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const table = await prisma.table.create({
        data: {
          name,
          capacity: parseInt(capacity),
          status: "available",
        },
      });

      return res.status(201).json(table);
    } catch (error) {
      console.error("Error creating table:", error);
      return res.status(500).json({ error: "Failed to create table" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}