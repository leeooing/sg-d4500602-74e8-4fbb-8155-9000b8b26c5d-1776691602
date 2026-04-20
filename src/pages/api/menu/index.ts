import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { category } = req.query;

      const where = category && typeof category === "string" 
        ? { category } 
        : {};

      const menuItems = await prisma.menuItem.findMany({
        where,
        orderBy: { name: "asc" },
      });

      return res.status(200).json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return res.status(500).json({ error: "Failed to fetch menu items" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, description, price, category, image, isAvailable, isBestSeller } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const menuItem = await prisma.menuItem.create({
        data: {
          name,
          description: description || "",
          price,
          category,
          image: image || "/placeholder.jpg",
          isAvailable: isAvailable !== undefined ? isAvailable : true,
          isBestSeller: isBestSeller || false,
        },
      });

      return res.status(201).json(menuItem);
    } catch (error) {
      console.error("Error creating menu item:", error);
      return res.status(500).json({ error: "Failed to create menu item" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}