import { PrismaClient } from "@prisma/client";
import { menuItems } from "../src/lib/menu-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.staffRequest.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.table.deleteMany();
  await prisma.admin.deleteMany();

  // Seed tables
  console.log("📌 Creating tables...");
  const tables = await Promise.all([
    prisma.table.create({
      data: { name: "Bàn 1", capacity: 4, status: "available" },
    }),
    prisma.table.create({
      data: { name: "Bàn 2", capacity: 4, status: "available" },
    }),
    prisma.table.create({
      data: { name: "Bàn 3", capacity: 6, status: "available" },
    }),
    prisma.table.create({
      data: { name: "Bàn 4", capacity: 6, status: "available" },
    }),
    prisma.table.create({
      data: { name: "Bàn 5", capacity: 8, status: "available" },
    }),
    prisma.table.create({
      data: { name: "Bàn VIP", capacity: 10, status: "available" },
    }),
  ]);
  console.log(`✅ Created ${tables.length} tables`);

  // Seed menu items
  console.log("🍽️ Creating menu items...");
  const menuItemsCreated = await Promise.all(
    menuItems.map((item) =>
      prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price.toString(),
          category: item.category,
          image: item.image,
          isAvailable: !item.soldOut,
          isBestSeller: item.bestSeller || false,
        },
      })
    )
  );
  console.log(`✅ Created ${menuItemsCreated.length} menu items`);

  // Create admin user
  console.log("👤 Creating admin user...");
  const admin = await prisma.admin.create({
    data: {
      username: "admin",
      password: "admin123", // In production, hash this!
      name: "Admin",
    },
  });
  console.log(`✅ Created admin: ${admin.username}`);

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });