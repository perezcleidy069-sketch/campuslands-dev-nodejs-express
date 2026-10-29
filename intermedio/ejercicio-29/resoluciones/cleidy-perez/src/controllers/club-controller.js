function createClubController(service) {
  return {
    list(req, res) {
      res.json({ ok: true, ...service.list(req.query) });
    },
    getById(req, res, next) {
      const club = service.getById(req.params.id);
      if (!club) {
        next(Object.assign(new Error('Club no encontrado'), { status: 404 }));
        return;
      }
      res.json({ ok: true, data: club });
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

module.exports = { createClubController };
