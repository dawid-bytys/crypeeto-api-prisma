import express from "express";
import {
  register,
  login,
  authorization,
  getUserData,
} from "../controllers/Auth.controller";
import { authenticateToken } from "../utils/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/auth", authorization);
authRouter.get("/user", authenticateToken, getUserData);

export default authRouter;
