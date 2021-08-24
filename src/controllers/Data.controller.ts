import { Request, Response } from "express";
import axios from "axios";
import { isInputValid } from "../utils/validation";

// Types
interface CryptoData {
  meta: {
    symbol: string;
    interval: string;
    currency_base: string;
    currency_quote: string;
    exchange: string;
    type: string;
  };
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
  }[];
  status: string;
}

export const getChartData = async (req: Request, res: Response) => {
  // Check whether provided data is valid
  if (!isInputValid(req.query, 3))
    return res.status(400).send({ message: "Invalid input" });

  const { symbol, exchange, interval } = req.query;

  // Try to fetch crypto data
  try {
    const { data } = await axios.get<CryptoData>(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&exchange=${exchange}&interval=${interval}&apikey=${process.env.TWELVEDATA_API_KEY}`
    );

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ message: err.toString() });
  }
};
