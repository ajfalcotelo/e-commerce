import path from "path";

const notFound = (req, res, next) => {
  const error = new Error(
    `URL Not Found - ${req.protocol}://${req.get("host")}${req.originalUrl})}`
  );
  error.status = 404;
  next(error);
};

export default notFound;
