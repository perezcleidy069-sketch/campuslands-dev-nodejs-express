import { Router } from 'express';
import { getCharacters, postCharacter } from '../controllers/character.controller.js';

const router = Router();

router.get('/characters', getCharacters);
router.post('/characters', postCharacter);

export default router;