import express, { json } from "express";

const usersRouter = express.Router();

usersRouter.get("/testuser", (req, res) => {
  res.json({ message: "route is working" });
});

export default usersRouter;
