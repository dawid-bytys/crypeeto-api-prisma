import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Currency {
  name: string;
}

interface Exchange {
  from: string;
  to: string;
  amount: number;
}

export const createWallet = async (req: Request, res: Response) => {
  const user = req.user;
  const { name }: Currency = req.body;

  if (!name) return res.status(400).send({ message: "Invalid input" });

  // Find a cryptocurrency with provided type
  const specificCurrency = await prisma.cryptocurrency.findUnique({
    where: { name: name },
  });
  if (!specificCurrency)
    return res
      .status(400)
      .send({ message: "We do not support the provided currency" });

  // Check whether the user already has a wallet with provided cryptocurrency type
  const wallet = await prisma.wallet.findFirst({
    where: {
      userUUID: user.uuid,
      cryptocurrencyUUID: specificCurrency.uuid,
    },
  });
  if (wallet)
    return res.status(400).send({
      message: "You already have a wallet with provided cryptocurrency",
    });

  try {
    await prisma.wallet.create({
      data: {
        userUUID: user.uuid,
        cryptocurrencyUUID: specificCurrency.uuid,
      },
    });

    res
      .status(200)
      .send({ message: "Your new wallet has been successfully created" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
