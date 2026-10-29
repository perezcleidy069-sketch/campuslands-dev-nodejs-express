module.exports={
  "topic": "Métricas simples para libros",
  "mode": "metrics",
  "resource": "books",
  "records": [
    {
      "id": 1,
      "title": "La ruta de papel",
      "pages": 240
    }
  ],
  "sample": {
    "action": "increment",
    "name": "books_read"
  },
  "smokeAction": {
    "action": "increment",
    "name": "books_read"
  }
};
