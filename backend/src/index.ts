import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routes/movies";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const PROXY_URL = process.env.PROXY_BASE_URL;

if (!PROXY_URL) {
  console.warn("⚠️ PROXY_BASE_URL is not defined in .env file!");
}

console.log("Using PROXY_URL:", PROXY_URL);

app.use("/", moviesRouter);

const PORT = process.env.PORT_BACKEND || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});