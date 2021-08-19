import express from "express";
import { getNews } from "../controllers/News.controller";
import { authenticateToken } from "../middleware/auth";

export const newsRouter = express.Router();

newsRouter.get("/news", authenticateToken, getNews);
