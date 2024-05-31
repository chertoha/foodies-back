import express, { json } from "express";

const testimonialsRouter = express.Router();

testimonialsRouter.get("/test", (req, res) => {
  res.json({ message: "route is working" });
});

export default testimonialsRouter;
