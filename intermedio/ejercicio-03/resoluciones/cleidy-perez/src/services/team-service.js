const teams = [
  { id: 1, name: 'Phoenix', region: 'LAN' },
  { id: 2, name: 'Titans', region: 'LAS' },
];

export const getTeams = () => teams;
export const findTeam = (id) => teams.find((team) => team.id === Number(id));

export function addTeam(data) {
  const team = { id: Math.max(0, ...teams.map(({ id }) => id)) + 1, ...data };
  teams.push(team);
  return team;
}
