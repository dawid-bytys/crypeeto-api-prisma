import express from "express";
import { authenticateToken } from "../middleware/auth";
import { createWallet, updateWallet } from "../controllers/Wallet.controller";

export const walletRouter = express.Router();

walletRouter.post("/create", authenticateToken, createWallet);
walletRouter.post("/update/:type", authenticateToken, updateWallet);
