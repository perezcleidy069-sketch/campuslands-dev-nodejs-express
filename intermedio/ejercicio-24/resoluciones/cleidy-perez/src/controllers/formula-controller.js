function createFormulaController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, data: service.list() });
    },
    getById(req, res, next) {
      const formula = service.getById(req.params.id);
      if (!formula) {
        next(Object.assign(new Error('Formula no encontrada'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: formula });
    },
    create(req, res, next) {
      try {
        const formula = service.create(req.body);
        res.status(201).json({ ok: true, data: formula });
      } catch (error) {
        next(error);
      }
    },
  };
}

module.exports = { createFormulaController };
