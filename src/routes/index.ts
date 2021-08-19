import express from "express";
import { authRouter } from "./auth";
import { walletRouter } from "./wallet";
import { newsRouter } from "./news";
import { dataRouter } from "./data";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/wallet", walletRouter);
router.use(newsRouter);
router.use(dataRouter);
