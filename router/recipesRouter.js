import express, { json } from "express";

const recipesRouter = express.Router();

recipesRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default recipesRouter;
