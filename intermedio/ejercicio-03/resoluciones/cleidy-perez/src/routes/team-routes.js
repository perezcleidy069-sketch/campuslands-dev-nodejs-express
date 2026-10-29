import { Router } from 'express';
import { createTeam, getTeam, listTeams } from '../controllers/team-controller.js';

const router = Router();
router.get('/', listTeams);
router.get('/:id', getTeam);
router.post('/', createTeam);

export default router;
