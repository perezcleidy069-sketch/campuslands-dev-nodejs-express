function createGameController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, data: service.list() });
    },
    getById(req, res, next) {
      const game = service.getById(req.params.id);
      if (!game) {
        next(Object.assign(new Error('Juego no encontrado'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: game });
    },
    create(req, res, next) {
      try {
        res.status(201).json({ ok: true, data: service.create(req.body) });
      } catch (error) {
        next(error);
      }
    },
  };
}

module.exports = { createGameController };
