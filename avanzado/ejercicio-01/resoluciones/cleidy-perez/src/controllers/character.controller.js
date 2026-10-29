function createCharacterController(config, service) {
  return {
    listV1(req, res) {
      const { data } = service.list(req.query);
      res.json({ ok: true, version: 'v1', count: data.length, data });
    },
    async createV1(req, res, next) {
      const { name, class: characterClass, level } = req.body;
      if (typeof name !== 'string' || !name.trim() || typeof characterClass !== 'string' || !characterClass.trim()) {
        return res.status(400).json({
          ok: false,
          error: { code: 'INVALID_CHARACTER', message: 'name and class are required' }
        });
      }

      const parsedLevel = level === undefined ? 1 : Number(level);
      if (!Number.isInteger(parsedLevel) || parsedLevel < 1 || parsedLevel > 100) {
        return res.status(400).json({
          ok: false,
          error: { code: 'INVALID_LEVEL', message: 'level must be an integer from 1 to 100' }
        });
      }

      try {
        const result = await service.perform({ name: name.trim(), class: characterClass.trim(), level: parsedLevel });
        res.status(201).json({ ok: true, version: 'v1', data: result.created });
      } catch (error) {
        next(error);
      }
    },
    listV2(req, res) {
      const { data } = service.list(req.query);
      res.json({
        ok: true,
        version: 'v2',
        count: data.length,
        data: data.map(character => ({ ...character, powerScore: character.level * 10 }))
      });
    }
  };
}

module.exports = { createCharacterController };