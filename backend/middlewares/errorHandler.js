const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .json({ status: err.status, success: false, message: err.message });
  } else {
    res.status(500).send("Server Error: Something went wrong in the server");
  }
};

export default errorHandler;
