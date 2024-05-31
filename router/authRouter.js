import express from "express";

const authRouter = express.Router();

authRouter.get("/test", (req, res) => {
  res.json({ message: "cicd works ok" });
});

export default authRouter;
