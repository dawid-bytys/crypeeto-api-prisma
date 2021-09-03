import express from "express";
import {
  register,
  login,
  getUserData,
  logout,
} from "../controllers/Auth.controller";
import { authenticateToken } from "../middleware/auth";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticateToken, logout);
authRouter.get("/user", authenticateToken, getUserData);
