import multer from "multer";
import HttpError from "../helpers/HttpError.js";

function handleMulterError(upload) {
  return (req, res, next) => {
    upload(req, res, error => {
      if (error instanceof multer.MulterError) {
        next(HttpError(400, error.message));
      } else if (error) {
        next(error);
      }
      next();
    });
  };
}

export default handleMulterError;
