# API de equipos MOBA documentada

API de equipos de esports MOBA con contrato OpenAPI 3.0.3. La especificacion JSON se sirve junto con el recurso documentado para facilitar su consulta y consumo.

## Instalacion y ejecucion

Requiere Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

Servidor: `http://localhost:3000`; desarrollo: `npm run dev`.

## Documentacion

- `GET /api/docs`: entrega la especificacion OpenAPI en JSON.
- `GET /api/docs.json`: alias JSON de la especificacion.
- `src/openapi.json`: contrato versionado de la API.

## Endpoints del recurso

| Metodo | Ruta | Respuesta |
| --- | --- | --- |
| GET | `/health` | Estado de la API. |
| GET | `/api/teams` | Lista equipos de esports. |
| GET | `/api/teams/:id` | Consulta un equipo. |
| POST | `/api/teams` | Crea un equipo con `name` y `region`. |

```bash
curl http://localhost:3000/api/docs
curl http://localhost:3000/api/teams
curl -X POST http://localhost:3000/api/teams -H "Content-Type: application/json" -d "{\"name\":\"Jade Sentinels\",\"region\":\"North League\"}"
```

Los ejemplos y esquemas request/response completos estan definidos en OpenAPI; las entradas incompletas responden `400` y los IDs inexistentes `404`.
