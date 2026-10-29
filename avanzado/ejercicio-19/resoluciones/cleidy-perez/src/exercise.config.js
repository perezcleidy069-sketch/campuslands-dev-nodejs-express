module.exports={
  "topic": "Auditoría de acciones para tatuajes",
  "mode": "audit",
  "resource": "appointments",
  "records": [
    {
      "id": 1,
      "artist": "Sol",
      "design": "Colibrí",
      "status": "booked"
    }
  ],
  "sample": {
    "action": "record",
    "actor": "artist-1",
    "operation": "confirm",
    "target": "appointment-1"
  },
  "smokeAction": {
    "action": "record",
    "actor": "artist-1",
    "operation": "confirm",
    "target": "appointment-1"
  }
};
