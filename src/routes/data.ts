import express from "express";
import { getChartData } from "../controllers/Data.controller";
import { authenticateToken } from "../middleware/auth";

export const dataRouter = express.Router();

dataRouter.get("/data", authenticateToken, getChartData);
