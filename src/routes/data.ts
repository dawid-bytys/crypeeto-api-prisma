import express from "express";
import { getChartData } from "../controllers/Data.controller";
import { authenticateToken } from "../utils/auth";

const dataRouter = express.Router();

dataRouter.get("/data", authenticateToken, getChartData);

export default dataRouter;