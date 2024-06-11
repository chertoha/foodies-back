import mongoose from "mongoose";
import app from "./app.js";

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("\x1b[34m Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log("\x1b[31m Error during connection to database \n", error);
    process.exit(1);
  });
