'use strict';
function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600 ? error.status : 500;
  res.status(status).json({ ok: false, error: status === 500 ? 'Error interno del servidor' : error.message, ...(req.requestId ? { requestId: req.requestId } : {}) });
}
module.exports = { errorHandler };
