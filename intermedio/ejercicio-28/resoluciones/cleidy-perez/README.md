# Battle Royale: ejemplos HTTP

API para consultar y crear lugares de aterrizaje de un juego Battle Royale. La entrega incluye `examples.http`, una coleccion importable con la extension REST Client de VS Code.

## Requisitos y ejecucion

Requiere Node.js 20 o superior.

```bash
npm install
npm start
```

En desarrollo: `npm run dev`. El servidor escucha en `http://localhost:3000`.

## Coleccion de peticiones

1. Instala la extension **REST Client** de VS Code.
2. Abre `examples.http`.
3. Pulsa **Send Request** sobre la peticion que quieres ejecutar.
4. Ejecuta primero el health check y el listado; las peticiones `POST` cambian el catalogo en memoria.

La coleccion prueba el estado, listado, detalle, registro valido y entrada invalida. Tambien se puede usar con curl:

```bash
curl http://localhost:3000/api/drops
curl -X POST http://localhost:3000/api/drops -H "Content-Type: application/json" -d "{\"name\":\"Dust Harbor\",\"biome\":\"Coastal\",\"risk\":\"medium\"}"
```

Los datos solo viven en memoria y se reinician al apagar el servidor. La entrada incompleta responde `400`; un punto de aterrizaje inexistente responde `404`.
