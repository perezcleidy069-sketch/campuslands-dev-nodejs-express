function createMotorcycleController(service) {
  return {
    list(req, res, next) {
      try {
        res.json({ ok: true, ...service.list(req.query), requestId: req.requestId });
      } catch (error) {
        next(error);
      }
    },
    getById(req, res, next) {
      const motorcycle = service.getById(req.params.id);
      if (!motorcycle) {
        next(Object.assign(new Error('Motocicleta no encontrada'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: motorcycle, requestId: req.requestId });
    },
    create(req, res) {
      const motorcycle = service.create(req.validatedMotorcycle);
      res.status(201).json({ ok: true, data: motorcycle, requestId: req.requestId });
    },
  };
}

module.exports = { createMotorcycleController };
