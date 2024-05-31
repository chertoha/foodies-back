import express from "express";

const ingredientsRouter = express.Router();

ingredientsRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default ingredientsRouter;
