import express, { json } from "express";

const categoriesRouter = express.Router();

categoriesRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default categoriesRouter;
