const teams = [
  { id: 1, name: 'Phoenix', region: 'LAN' },
  { id: 2, name: 'Titans', region: 'LAS' },
];

export function getTeams() {
  return teams;
}

export function findTeamById(id) {
  const teamId = Number(id);
  return teams.find((team) => team.id === teamId);
}

export function addTeam(teamData) {
  const nextId = teams.reduce(
    (highestId, team) => Math.max(highestId, team.id),
    0,
  ) + 1;
  const team = { id: nextId, ...teamData };

  teams.push(team);
  return team;
}
