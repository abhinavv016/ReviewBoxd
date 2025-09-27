import express from "express";
import cors from "cors";
import moviesRouter from "./routes/movies";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/", moviesRouter);

const PORT = process.env.PORT_BACKEND || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});