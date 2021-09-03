import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Authenticate a user
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check whether an accessToken exists
  const accessToken: string = req.cookies.access_token;
  if (!accessToken) return res.status(401).send({ message: "Unauthorized" });

  // Try to verify the accessToken with the TOKEN_SECRET
  try {
    req.user = jwt.verify(accessToken, process.env.SECRET_TOKEN!);

    // Continue doing a request
    next();
  } catch (err) {
    res
      .status(401)
      .clearCookie("access_token")
      .send({ message: "Unauthorized" });
  }
};
