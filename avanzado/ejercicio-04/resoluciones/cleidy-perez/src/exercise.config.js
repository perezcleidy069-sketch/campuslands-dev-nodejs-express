module.exports={
  "topic": "Errores de dominio para Battle Royale",
  "mode": "domain-errors",
  "resource": "players",
  "records": [
    {
      "id": "solo-1",
      "name": "Raven",
      "alive": true
    },
    {
      "id": "solo-2",
      "name": "Mako",
      "alive": false
    }
  ],
  "sample": {
    "action": "eliminate",
    "playerId": "solo-1"
  },
  "smokeAction": {
    "action": "eliminate",
    "playerId": "solo-1"
  }
};
