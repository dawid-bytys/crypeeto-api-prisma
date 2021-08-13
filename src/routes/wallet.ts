import express from "express";
import { authenticateToken } from "../middleware/auth";
import { createWallet, updateWallet } from "../controllers/Wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/create", authenticateToken, createWallet);
walletRouter.post("/update/:type", authenticateToken, updateWallet);

export default walletRouter;
