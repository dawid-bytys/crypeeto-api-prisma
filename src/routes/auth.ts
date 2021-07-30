import express from "express";
import { register, login, authorization } from "../controllers/Auth.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/auth", authorization);

export default authRouter;
