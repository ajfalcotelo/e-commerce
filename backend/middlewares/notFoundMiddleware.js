const notFoundMiddleware = (req, res, next) => {
  console.log("notFoundMiddleware catched");

  const error = new Error(
    `URL Not Found - ${req.protocol}://${req.get("host")}${req.originalUrl})}`
  );
  error.status = 404;
  next(error);
};

export default notFoundMiddleware;
