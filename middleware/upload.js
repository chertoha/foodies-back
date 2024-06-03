import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,

  filename: function (req, file, callback) {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    callback(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const configuredFileFilter = allowedExtensions => {
  return (req, file, callback) => {
    const ext = file.originalname.split(".").pop();

    if ((allowedExtensions && !allowedExtensions.includes(ext.toLowerCase())) || ext === "exe") {
      callback(HttpError(400, `Alowed file extensions: ${allowedExtensions.join(", ")}`));
    }

    callback(null, true);
  };
};

export default function (
  { allowedExtensions, fileSize } = {
    allowedExtensions: null,
    fileSize: 1024 * 1024 * 8,
  }
) {
  return multer({
    storage,
    fileFilter: configuredFileFilter(allowedExtensions),
    limits: { fileSize },
  });
}
