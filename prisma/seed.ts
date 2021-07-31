import { PrismaClient } from "@prisma/client";
import { cryptocurrencies } from "./cryptocurrencies";
const prisma = new PrismaClient();

const main = async () => {
  console.log("Start seeding...");

  try {
    // Add cryptocurrencies
    for (const element of cryptocurrencies) {
      await prisma.cryptocurrency.create({
        data: element,
      });
    }

    // Add test user
    await prisma.user.create({
      data: {
        username: "testuser123",
        password: "PasswordHash123!",
        email: "test@test.com",
      },
    });

    // Fetch user's uuid
    const user = await prisma.user.findUnique({
      where: {
        username: "testuser123",
      },
    });

    // Fetch cryptocurrencies
    const firstCryptocurrency = await prisma.cryptocurrency.findUnique({
      where: { name: "Ripple" },
    });
    const secondCryptocurrency = await prisma.cryptocurrency.findUnique({
      where: { name: "Ethereum" },
    });

    if (user && firstCryptocurrency && secondCryptocurrency) {
      // Add two sample wallets
      await prisma.wallet.create({
        data: {
          userUUID: user.uuid,
          cryptocurrencyUUID: firstCryptocurrency.uuid,
        },
      });

      await prisma.wallet.create({
        data: {
          userUUID: user.uuid,
          cryptocurrencyUUID: secondCryptocurrency.uuid,
        },
      });
    }
    console.log("Finished seeding.");

    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
