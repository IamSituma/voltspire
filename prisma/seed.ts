import prisma from "../lib/prisma";

async function main() {
  const products = [
    {
      name: "Solar Panel 100W",
      image: "/images/solar-panel.jpg",
      price: 1200000,
      offerPrice: 1100000,
      category: "Power Stations",
      description: "High-efficiency 100W solar panel for home or outdoor use.",
    },
    {
      name: "Portable Power Bank 20,000mAh",
      image: "/images/powerbank.jpg",
      price: 250000,
      offerPrice: 220000,
      category: "Power Banks",
      description: "Reliable portable power bank with fast charging support.",
    },
    // Add more products here
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Seeded products successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
