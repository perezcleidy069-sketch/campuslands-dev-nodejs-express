const players = [
  { id: 1, gamerTag: 'ViperOne', rank: 'Diamond' },
  { id: 2, gamerTag: 'NovaAim', rank: 'Platinum' },
];

export function getPlayers() {
  return players;
}

export function findPlayerById(id) {
  const playerId = Number(id);
  return players.find((player) => player.id === playerId);
}

export function addPlayer(playerData) {
  const player = {
    id: players.reduce((highestId, current) => Math.max(highestId, current.id), 0) + 1,
    ...playerData,
  };

  players.push(player);
  return player;
}
