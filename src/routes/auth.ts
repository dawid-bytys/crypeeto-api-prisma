import express from "express";
import { register, login, getUserData } from "../controllers/Auth.controller";
import { authenticateToken } from "../middleware/auth";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", authenticateToken, getUserData);

export default authRouter;
