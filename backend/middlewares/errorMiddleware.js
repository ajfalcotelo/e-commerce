const errorMiddleware = (err, req, res, next) => {
  console.log("errorMiddleware catched");

  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({
      message: "Something went wrong in the server",
      error: err.message,
    });
  }
};

export default errorMiddleware;
