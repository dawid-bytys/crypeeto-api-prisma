import { Request, Response } from "express";
import { prisma } from "../prisma";
import {
  isInputValid,
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
} from "../utils/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Types
interface Credentials {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
  email: string;
}

interface CallbackData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  picture: string;
  wallets: {
    name: string;
    amount: number;
  }[];
}

export const register = async (req: Request, res: Response) => {
  // Check whether provided data exists
  if (!isInputValid<Credentials>(req.body, 6))
    return res.status(400).send({ message: "Invalid input" });

  const {
    first_name,
    last_name,
    username,
    password,
    confirm_password,
    email,
  }: Credentials = req.body;

  // Check whether passwords match
  if (password !== confirm_password)
    return res.status(400).send({
      message: "The passwords do not match",
    });

  // Validate a username
  if (!isUsernameValid(username))
    return res.status(400).send({
      message: "Username must meet the requirements",
    });

  // Validate the password
  if (!isPasswordValid(password))
    return res.status(400).send({
      message: "Password must meet the requirements",
    });

  // Validate en e-mail
  if (!isEmailValid(email))
    return res.status(400).send({
      message: "E-mail must meet the requirements",
    });

  // Check whether the email or the username exists in the database
  const [usernameExists, emailExists] = await Promise.all([
    prisma.user.findUnique({
      where: { username: username },
    }),
    prisma.user.findUnique({
      where: { email: email },
    }),
  ]);

  if (usernameExists || emailExists)
    return res
      .status(400)
      .send({ message: "Username or e-mail already exists in the database" }); // Prevent from an easier bruteforcing

  // Encrypt the provided password
  const passwordHash = bcrypt.hashSync(password, 16);

  // Try to save a user in the database
  try {
    await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: passwordHash,
        email: email,
      },
    });

    res.status(200).send({ message: "Successfully registered" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  // Check whether provided data exists
  if (!isInputValid<Omit<Credentials, "email">>(req.body, 2))
    return res.status(400).send({ message: "Invalid input" });

  const { username, password }: Omit<Credentials, "email"> = req.body;

  // Check whether a provided username exists in the database
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (!user)
    return res.status(400).send({ message: "Invalid username or password" }); // Prevent from an easier bruteforcing

  // Check whether a provided password matches the password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).send({ message: "Invalid username or password" }); // Prevent from an easier bruteforcing

  // Try to generate an accessToken
  try {
    const accessToken = jwt.sign(
      { uuid: user.uuid },
      process.env.SECRET_TOKEN || "",
      {
        expiresIn: "6h",
      }
    );

    // Send a user the accessToken
    res.status(200).send({
      message: "You've been successfully logged in!",
      access_token: accessToken,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const user = req.user;

  // Fetch user data and their wallets
  const [userData, userWallets] = await Promise.all([
    prisma.user.findUnique({
      where: {
        uuid: user.uuid,
      },
    }),
    prisma.wallet.findMany({
      where: {
        userUUID: user.uuid,
      },
    }),
  ]);
  if (!userData)
    return res.status(400).send({ message: "Something went wrong" });

  // If the user has no wallets, return their data with an empty wallets array
  if (!userWallets) {
    const callbackData: CallbackData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      picture: userData.picture,
      wallets: [],
    };

    return res.status(200).send(callbackData);
  }

  // Fetch matching currencies
  const currencies = await prisma.cryptocurrency.findMany({
    where: {
      uuid: {
        in: userWallets.map(x => x.cryptocurrencyUUID),
      },
    },
  });
  if (!currencies)
    return res.status(400).send({ message: "Something went wrong" });

  const callbackData: CallbackData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    email: userData.email,
    picture: userData.picture,
    wallets: userWallets.map(x => ({
      name: currencies.find(i => i.uuid === x.cryptocurrencyUUID)!.name,
      amount: x.amount,
    })),
  };

  // Return the user their data
  res.status(200).send(callbackData);
};
