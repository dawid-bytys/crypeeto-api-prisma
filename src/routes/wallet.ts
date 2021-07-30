import express from "express";
import { authenticateToken } from "../utils/auth";
import { createWallet } from "../controllers/Wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/create", authenticateToken, createWallet);

export default walletRouter;
