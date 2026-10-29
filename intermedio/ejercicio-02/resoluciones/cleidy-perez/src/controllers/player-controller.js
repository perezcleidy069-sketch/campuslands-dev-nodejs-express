import {
  addPlayer,
  findPlayerById,
  getPlayers,
} from '../services/player-service.js';

export function listPlayers(req, res) {
  res.json({ ok: true, data: getPlayers() });
}

export function getPlayer(req, res) {
  const player = findPlayerById(req.params.id);

  if (!player) {
    res.status(404).json({ ok: false, message: 'Jugador no encontrado' });
    return;
  }

  res.json({ ok: true, data: player });
}

export function createPlayer(req, res) {
  const { gamerTag, rank } = req.body ?? {};

  if (
    typeof gamerTag !== 'string' ||
    gamerTag.trim().length === 0 ||
    gamerTag.trim().length > 24
  ) {
    res.status(400).json({
      ok: false,
      message: 'gamerTag es obligatorio y debe tener entre 1 y 24 caracteres',
    });
    return;
  }

  if (typeof rank !== 'string' || rank.trim().length === 0) {
    res.status(400).json({
      ok: false,
      message: 'rank es obligatorio y debe ser texto',
    });
    return;
  }

  const player = addPlayer({ gamerTag: gamerTag.trim(), rank: rank.trim() });
  res.status(201).json({ ok: true, data: player });
}
