import express from "express";
import { fetchNews } from "../controllers/News.controller";
import { authenticateToken } from "../utils/auth";

const newsRouter = express.Router();

newsRouter.get("/news", authenticateToken, fetchNews);

export default newsRouter;
