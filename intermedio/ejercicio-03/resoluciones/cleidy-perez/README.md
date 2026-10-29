# Torneos MOBA: controladores limpios

API Express para consultar y registrar equipos de torneos MOBA. Las rutas definen URL y metodo, los controladores validan HTTP y dan formato a la respuesta, y el servicio conserva los datos en memoria.

## Ejecutar

```bash
npm install
npm run dev
```

Servidor: `http://localhost:3000`.

## Endpoints

- `GET /health`: estado del servicio.
- `GET /api/teams`: lista equipos.
- `GET /api/teams/:id`: consulta un equipo.
- `POST /api/teams`: crea equipo con `{"name":"Dragons","region":"LAN"}`.

```bash
curl http://localhost:3000/api/teams
curl -X POST http://localhost:3000/api/teams -H "Content-Type: application/json" -d "{\"name\":\"Dragons\",\"region\":\"LAN\"}"
```

La entrada invalida responde `400`, un ID inexistente responde `404`. Los datos se reinician al apagar el proceso.
