const { Router } = require('express');
const { getCharactersV1, createCharacterV1 } = require('../../controllers/character.controller');

const router = Router();

// Ruta: /api/v1/characters
router.get('/', getCharactersV1);
router.post('/', createCharacterV1);

fn = router;
module.exports = fn;