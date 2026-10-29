module.exports={
  "topic": "Caché en memoria para autos de lujo",
  "mode": "cache",
  "resource": "cars",
  "records": [
    {
      "id": "phantom",
      "brand": "Rolls-Royce",
      "model": "Phantom",
      "year": 2025
    },
    {
      "id": "urus",
      "brand": "Lamborghini",
      "model": "Urus",
      "year": 2025
    }
  ],
  "sample": {
    "action": "lookup",
    "key": "phantom"
  },
  "smokeAction": {
    "action": "lookup",
    "key": "phantom"
  }
};
