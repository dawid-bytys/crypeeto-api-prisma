import { PrismaClient } from "@prisma/client";
import { cryptocurrencies } from "./cryptocurrencies";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Add cryptocurrencies
    for (const element of cryptocurrencies) {
      await prisma.cryptocurrency.create({
        data: element,
      });
    }

    // Add test user
    const user = await prisma.user.create({
      data: {
        first_name: "Alex",
        last_name: "Smith",
        username: "testuser123",
        password: "PasswordHash123!",
        email: "test@test.com",
      },
    });

    // Fetch cryptocurrencies
    const [firstCryptocurrency, secondCryptocurrency] = await Promise.all([
      prisma.cryptocurrency.findUnique({
        where: { name: "Ripple" },
      }),
      prisma.cryptocurrency.findUnique({
        where: { name: "Ethereum" },
      }),
    ]);

    // Create two sample wallets
    await Promise.all([
      prisma.wallet.create({
        data: {
          userUUID: user.uuid,
          // @ts-ignore
          cryptocurrencyUUID: firstCryptocurrency.uuid,
        },
      }),
      prisma.wallet.create({
        data: {
          userUUID: user.uuid,
          // @ts-ignore
          cryptocurrencyUUID: secondCryptocurrency.uuid,
        },
      }),
    ]);

    console.log("Seeding finished.");
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
