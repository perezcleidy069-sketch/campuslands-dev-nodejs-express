function createTeamController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, data: service.list() });
    },
    getById(req, res, next) {
      const team = service.getById(req.params.id);
      if (!team) {
        next(Object.assign(new Error('Equipo no encontrado'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: team });
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

module.exports = { createTeamController };
