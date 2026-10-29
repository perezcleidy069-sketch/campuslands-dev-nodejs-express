'use strict';
function simulateBattle(players = []) {
  if (!Array.isArray(players) || players.length < 2) { const error = new Error('Se requieren al menos 2 jugadores'); error.status = 400; throw error; }
  const standings = players.map((player) => ({ name: player.name, score: Number(player.eliminations || 0) * 10 + Number(player.loot || 0) + (player.survived ? 25 : 0) }));
  if (standings.some((player) => !player.name || !Number.isFinite(player.score))) { const error = new Error('Datos de jugador invalidos'); error.status = 400; throw error; }
  standings.sort((a, b) => b.score - a.score);
  return { winner: standings[0], standings };
}
module.exports = { simulateBattle };
