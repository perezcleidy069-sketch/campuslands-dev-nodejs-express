function createLoadoutController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, data: service.list() });
    },
    getById(req, res, next) {
      const loadout = service.getById(req.params.id);
      if (!loadout) {
        next(Object.assign(new Error('Loadout no encontrado'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: loadout });
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

module.exports = { createLoadoutController };
