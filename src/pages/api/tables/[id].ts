import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid table ID" });
  }

  if (req.method === "GET") {
    try {
      const table = await prisma.table.findUnique({
        where: { id },
      });

      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }

      return res.status(200).json(table);
    } catch (error) {
      console.error("Error fetching table:", error);
      return res.status(500).json({ error: "Failed to fetch table" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const table = await prisma.table.update({
        where: { id },
        data: req.body,
      });

      return res.status(200).json(table);
    } catch (error) {
      console.error("Error updating table:", error);
      return res.status(500).json({ error: "Failed to update table" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.table.delete({
        where: { id },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting table:", error);
      return res.status(500).json({ error: "Failed to delete table" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}