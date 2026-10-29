function createDropController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, data: service.list() });
    },
    getById(req, res, next) {
      const drop = service.getById(req.params.id);
      if (!drop) {
        next(Object.assign(new Error('Punto de aterrizaje no encontrado'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: drop });
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

module.exports = { createDropController };
