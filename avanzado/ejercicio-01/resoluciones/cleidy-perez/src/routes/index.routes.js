const { Router } = require('express');
const characterRoutesV1 = require('./v1/character.routes');

const router = Router();

// Prefijo para la versión 1 de la API
router.use('/api/v1/characters', characterRoutesV1);

module.exports = router;