function createAuthenticate(authService) {
  return function authenticate(req, res, next) {
    const authorization = req.get('Authorization') || '';
    const match = authorization.match(/^Bearer\s+(.+)$/i);
    const user = match ? authService.authenticate(match[1]) : null;

    if (!user) {
      res.status(401).json({
        ok: false,
        message: 'Autenticacion requerida',
        requestId: req.requestId,
      });
      return;
    }

    req.user = user;
    next();
  };
}

module.exports = { createAuthenticate };
