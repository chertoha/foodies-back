import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router/index.js";
import "dotenv/config";

const app = express();

app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;

//
