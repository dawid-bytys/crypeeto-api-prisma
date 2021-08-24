import { Request, Response } from "express";
import { prisma } from "../prisma";
import axios from "axios";
import { getAbbreviation } from "../utils/abbreviation";
import { isInputValid } from "../utils/validation";

// Types
interface Currency {
  name: string;
}

interface Exchange {
  from: string;
  to: string;
  amount: number;
}

interface Add extends Currency {
  amount: number;
}

interface Rate {
  symbol: string;
  rate: number;
  amount: number;
  timestamp: number;
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

  // Check whether a user already has a wallet with provided cryptocurrency type
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

export const updateWallet = async (req: Request, res: Response) => {
  const user = req.user;
  const { type } = req.params;

  // Check whether the user has entered a correct endpoint
  if (type !== "exchange" && type !== "add")
    return res.status(404).send({ message: "Endpoint not found" });

  if (type === "add") {
    // Check whether the user has provided a correct input
    if (!isInputValid<Add>(req.body, 2) || req.body.amount <= 0)
      return res.status(400).send({ message: "Invalid input" });

    const { name, amount }: Add = req.body;

    // Check whether a provided currency name exists in the database
    const specificCurrency = await prisma.cryptocurrency.findUnique({
      where: { name: name },
    });
    if (!specificCurrency)
      return res.status(400).send({
        message: "We do not support the provided currency",
      });

    // Check whether the user already has a wallet with provided cryptocurrency type
    const wallet = await prisma.wallet.findFirst({
      where: {
        userUUID: user.uuid as string,
        cryptocurrencyUUID: specificCurrency.uuid,
      },
    });
    if (!wallet)
      return res.status(400).send({
        message:
          "You do not have a wallet with provided cryptocurrency, create it first",
      });

    // Try to update a user's wallet
    try {
      await prisma.wallet.updateMany({
        where: {
          userUUID: user.uuid as string,
          cryptocurrencyUUID: specificCurrency.uuid,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      res
        .status(200)
        .send({ message: "Your wallet has been successfully updated" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } else {
    // Check whether the user has provided a correct input
    if (!isInputValid<Exchange>(req.body, 3) || req.body.amount <= 0)
      return res.status(400).send({ message: "Invalid input" });

    const { from, to, amount }: Exchange = req.body;

    // Check whether the user has provided different currencies
    if (from === to)
      return res
        .status(400)
        .send({ message: "You cannot exchange the same currency" });

    // Check whether a provided currency name exists in the database
    const [fromCurrency, toCurrency] = await Promise.all([
      prisma.cryptocurrency.findUnique({
        where: { name: from },
      }),
      prisma.cryptocurrency.findUnique({
        where: { name: to },
      }),
    ]);
    if (!fromCurrency || !toCurrency)
      return res.status(400).send({
        message: "We do not support the provided currency",
      });

    // Check whether the user has wallets with the provided cryptocurrencies
    const [fromWallet, toWallet] = await Promise.all([
      prisma.wallet.findFirst({
        where: {
          userUUID: user.uuid as string,
          cryptocurrencyUUID: fromCurrency.uuid,
        },
      }),
      prisma.wallet.findFirst({
        where: {
          userUUID: user.uuid as string,
          cryptocurrencyUUID: toCurrency.uuid,
        },
      }),
    ]);
    if (!fromWallet || !toWallet)
      return res.status(400).send({
        message:
          "You either do not have a wallet with provided 'from' currency or with provided 'to' currency",
      });

    // Check whether the user has enough amount of tokens in a 'from' currency wallet
    const tokensAmount = fromWallet.amount;
    if (tokensAmount < amount)
      return res
        .status(400)
        .send({ message: "Not enough funds in the wallet" });

    // Try to fetch the latest exchange rate and update the wallet
    try {
      const { data } = await axios.get<Rate>(
        `https://api.twelvedata.com/currency_conversion?symbol=${getAbbreviation(
          from
        )}/${getAbbreviation(to)}&amount=${amount}&apikey=${
          process.env.TWELVEDATA_API_KEY
        }`
      );
      const exchangedAmount = data.amount;

      // Subtract from the previous wallet and add to the new wallet
      await Promise.all([
        prisma.wallet.updateMany({
          where: {
            userUUID: user.uuid as string,
            cryptocurrencyUUID: fromCurrency.uuid,
          },
          data: {
            amount: {
              decrement: amount,
            },
          },
        }),
        prisma.wallet.updateMany({
          where: {
            userUUID: user.uuid as string,
            cryptocurrencyUUID: toCurrency.uuid,
          },
          data: {
            amount: {
              increment: exchangedAmount,
            },
          },
        }),
      ]);

      res
        .status(200)
        .send({ message: "Your wallet has been successfully updated" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
};
