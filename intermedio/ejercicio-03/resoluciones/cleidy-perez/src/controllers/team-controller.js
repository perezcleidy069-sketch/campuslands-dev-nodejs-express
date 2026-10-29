import { addTeam, findTeam, getTeams } from '../services/team-service.js';

export function listTeams(req, res) {
  res.json({ ok: true, data: getTeams() });
}

export function getTeam(req, res) {
  const team = findTeam(req.params.id);
  if (!team) return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });
  res.json({ ok: true, data: team });
}

export function createTeam(req, res) {
  const { name, region } = req.body ?? {};
  if (typeof name !== 'string' || !name.trim() || typeof region !== 'string' || !region.trim()) {
    return res.status(400).json({ ok: false, message: 'name y region son obligatorios' });
  }
  res.status(201).json({ ok: true, data: addTeam({ name: name.trim(), region: region.trim() }) });
}
