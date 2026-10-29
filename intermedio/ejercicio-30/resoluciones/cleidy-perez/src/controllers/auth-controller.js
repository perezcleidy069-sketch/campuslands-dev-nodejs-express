function createAuthController(authService) {
  return {
    login(req, res) {
      const { email, password } = req.body ?? {};
      const session = authService.login(email, password);
      if (!session) {
        res.status(401).json({
          ok: false,
          message: 'Credenciales invalidas',
          requestId: req.requestId,
        });
        return;
      }
      res.json({ ok: true, ...session, requestId: req.requestId });
    },
  };
}

module.exports = { createAuthController };
