import {
  addTeam,
  findTeamById,
  getTeams,
} from '../services/team-service.js';

export function listTeams(req, res) {
  res.json({ ok: true, data: getTeams() });
}

export function getTeam(req, res) {
  const team = findTeamById(req.params.id);

  if (!team) {
    res.status(404).json({ ok: false, message: 'Equipo no encontrado' });
    return;
  }

  res.json({ ok: true, data: team });
}

export function createTeam(req, res) {
  const { name, region } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({
      ok: false,
      message: 'name es obligatorio y debe ser texto no vacio',
    });
    return;
  }

  if (typeof region !== 'string' || region.trim().length === 0) {
    res.status(400).json({
      ok: false,
      message: 'region es obligatoria y debe ser texto no vacio',
    });
    return;
  }

  const team = addTeam({ name: name.trim(), region: region.trim() });
  res.status(201).json({ ok: true, data: team });
}
