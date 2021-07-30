import { Request, Response } from "express";
import axios from "axios";

interface News {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

export const fetchNews = async (req: Request, res: Response) => {
  const { topic } = req.query;

  if (!topic) return res.status(400).send({ message: "Invalid input" });

  // Get last week's date
  const currentDate = new Date();
  const weekPeriod = new Date(currentDate.setDate(currentDate.getDate() - 7))
    .toISOString()
    .split("T")[0];

  try {
    const { data } = await axios.get<News>(
      `https://newsapi.org/v2/everything?q=${topic}&from=${weekPeriod}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
