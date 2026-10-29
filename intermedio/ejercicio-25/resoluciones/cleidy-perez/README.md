# API de juegos RPG

API Express para consultar y registrar videojuegos RPG. El ejercicio se enfoca en probar rutas HTTP mediante un servidor real iniciado en un puerto efimero, usando el runner integrado `node:test` y `fetch`.

## Requisitos y ejecucion

Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

La API escucha en `http://localhost:3000`; para desarrollo usa `npm run dev`.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Estado de la API. |
| GET | `/api/games` | Lista juegos RPG. |
| GET | `/api/games/:id` | Busca un juego por ID. |
| POST | `/api/games` | Registra un juego con `name` y `genre`. |

```bash
curl http://localhost:3000/api/games
curl -X POST http://localhost:3000/api/games -H "Content-Type: application/json" -d "{\"name\":\"Ashen Crown\",\"genre\":\"Fantasy RPG\"}"
```

Las pruebas de ruta verifican respuestas JSON, códigos `200`, `201`, `400` y `404`; no dependen de un puerto fijo ni de servicios externos.
