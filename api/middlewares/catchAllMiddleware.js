const catchAllMiddleware = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { catchAllMiddleware };
