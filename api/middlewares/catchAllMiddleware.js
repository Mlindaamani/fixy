/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const catchAllMiddleware = (err, req, res, next) => {
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "Unexpected field.",
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File size is too large. Maximum size is 5MB.",
    });
  }

  if (err.code === "LIMIT_UNSUPPORTED_MEDIA_TYPE") {
    return res.status(400).json({
      message: "Unsupported file type.",
    });
}
  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      message: "Too many files. Maximum is 1.",
    });
  }

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  console.error("Error:", err);

  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "prod.logs" : err.stack,
  };

  res.status(statusCode).json(responseBody);
};
module.exports = { catchAllMiddleware };
