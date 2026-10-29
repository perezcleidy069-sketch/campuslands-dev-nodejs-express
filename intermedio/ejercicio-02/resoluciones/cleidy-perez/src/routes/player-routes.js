import { Router } from 'express';
import {
  createPlayer,
  getPlayer,
  listPlayers,
} from '../controllers/player-controller.js';

const router = Router();

router.get('/', listPlayers);
router.get('/:id', getPlayer);
router.post('/', createPlayer);

export default router;
