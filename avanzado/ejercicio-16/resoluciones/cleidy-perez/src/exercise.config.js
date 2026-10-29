module.exports={
  "topic": "Sanitización de entradas para sneakers",
  "mode": "sanitize",
  "resource": "sneakers",
  "records": [
    {
      "id": 1,
      "brand": "Andes",
      "model": "Runner 1"
    }
  ],
  "sample": {
    "action": "create",
    "brand": "Nova",
    "model": "<b>Street One</b>"
  },
  "smokeAction": {
    "action": "create",
    "brand": "Nova",
    "model": "<b>Street One</b>"
  }
};
