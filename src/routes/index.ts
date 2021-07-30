import express from "express";
import authRouter from "./auth";
import walletRouter from "./wallet";
import newsRouter from "./news";

const router = express.Router();

router.use(authRouter);
router.use("/wallet", walletRouter);
router.use(newsRouter);

export default router;
