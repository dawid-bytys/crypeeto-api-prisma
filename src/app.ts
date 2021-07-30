import express from "express";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Server configuration
app.use(express.json());
app.use("/api", router);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `The server has started running on port ${PORT}.`
    );
  });
}

export default app;
