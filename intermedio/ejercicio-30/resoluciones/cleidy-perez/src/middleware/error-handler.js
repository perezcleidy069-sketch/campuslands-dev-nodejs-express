function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  const status =
    Number.isInteger(error.status) && error.status >= 400 && error.status < 600
      ? error.status
      : 500;
  if (status === 500) console.error(error);
  res.status(status).json({
    ok: false,
    message: status === 500 ? 'Error interno del servidor' : error.message,
    requestId: req.requestId,
  });
}

module.exports = { errorHandler };
