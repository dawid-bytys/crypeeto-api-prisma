import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
} from "../utils/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Types
interface Credentials {
  username: string;
  password: string;
  email: string;
}

export const register = async (req: Request, res: Response) => {
  const { username, password, email }: Credentials = req.body;

  // Check whether the provided data exists
  if (!username || !password || !email)
    return res.status(400).send({ message: "Invalid input" });

  // Validate the username
  if (!isUsernameValid(username))
    return res.status(400).send({
      message: "Username must meet the requirements",
    });

  // Validate the password
  if (!isPasswordValid(password))
    return res.status(400).send({
      message: "Password must meet the requirements",
    });

  // Validate the e-mail
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

  // Try to save the user to the database
  try {
    await prisma.user.create({
      data: {
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
  const { username, password }: Omit<Credentials, "email"> = req.body;

  // Check whether the provided data exists
  if (!username || !password)
    return res.status(400).send({ message: "Invalid input" });

  // Check whether the provided username exists in the database
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (!user)
    return res.status(400).send({ message: "Invalid username or password" }); // Prevent from an easier bruteforcing

  // Check whether the provided password matches the password in the database
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

    // Send the user his accessToken
    res.status(200).send({
      access_token: accessToken,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const authorization = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  // Check whether the accessToken exists
  if (!accessToken)
    return res.status(401).send({
      is_authorized: false,
    });

  // Try to decode the token
  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.SECRET_TOKEN || ""
    ) as any;

    // Check whether the token has already expired
    const user = await prisma.user.findUnique({
      where: { uuid: decodedToken.uuid },
    });
    if (!user) return res.status(401).send({ is_authorized: false });

    res.status(200).send({
      is_authorized: true,
    });
  } catch (err) {
    res.status(401).send({
      is_authorized: false,
    });
  }
};
