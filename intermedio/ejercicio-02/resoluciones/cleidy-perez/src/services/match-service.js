const matches = [
  {
    id: 1,
    map: 'Ascent',
    teams: [
      { name: 'Campus', score: 13 },
      { name: 'Rivals', score: 9 },
    ],
  },
];

export function getMatches() {
  return matches;
}

export function findMatchById(id) {
  const matchId = Number(id);
  return matches.find((match) => match.id === matchId);
}

export function addMatch(matchData) {
  const match = {
    id: matches.reduce((highestId, current) => Math.max(highestId, current.id), 0) + 1,
    ...matchData,
  };

  matches.push(match);
  return match;
}
