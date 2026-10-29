import { Router } from 'express';
import {
  createMatch,
  getMatch,
  listMatches,
} from '../controllers/match-controller.js';

const router = Router();

router.get('/', listMatches);
router.get('/:id', getMatch);
router.post('/', createMatch);

export default router;
