import express from "express";

const areasRouter = express.Router();

areasRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default areasRouter;
