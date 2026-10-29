module.exports={
  "topic": "Transacciones simuladas para fútbol",
  "mode": "transaction",
  "resource": "clubs",
  "records": [
    {
      "id": "wolves",
      "name": "Wolves FC",
      "balance": 100
    },
    {
      "id": "falcons",
      "name": "Falcons FC",
      "balance": 40
    }
  ],
  "sample": {
    "action": "transfer",
    "from": "wolves",
    "to": "falcons",
    "amount": 10
  },
  "smokeAction": {
    "action": "transfer",
    "from": "wolves",
    "to": "falcons",
    "amount": 10
  }
};
