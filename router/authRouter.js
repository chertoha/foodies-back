import express, { json } from "express";

const authRouter = express.Router();

authRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default authRouter;
