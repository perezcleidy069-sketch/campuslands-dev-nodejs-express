import {
  addMatch,
  findMatchById,
  getMatches,
} from '../services/match-service.js';

export function listMatches(req, res) {
  res.json({ ok: true, data: getMatches() });
}

export function getMatch(req, res) {
  const match = findMatchById(req.params.id);

  if (!match) {
    res.status(404).json({ ok: false, message: 'Partida no encontrada' });
    return;
  }

  res.json({ ok: true, data: match });
}

export function createMatch(req, res) {
  const { map, teams } = req.body ?? {};

  if (typeof map !== 'string' || map.trim().length === 0) {
    res.status(400).json({
      ok: false,
      message: 'map es obligatorio y debe ser texto',
    });
    return;
  }

  const teamsAreValid =
    Array.isArray(teams) &&
    teams.length === 2 &&
    teams.every(
      (team) =>
        team !== null &&
        typeof team === 'object' &&
        typeof team.name === 'string' &&
        team.name.trim().length > 0 &&
        Number.isInteger(team.score) &&
        team.score >= 0,
    );

  if (!teamsAreValid) {
    res.status(400).json({
      ok: false,
      message:
        'teams debe incluir exactamente dos equipos con name y score entero no negativo',
    });
    return;
  }

  const match = addMatch({
    map: map.trim(),
    teams: teams.map((team) => ({
      name: team.name.trim(),
      score: team.score,
    })),
  });

  res.status(201).json({ ok: true, data: match });
}
