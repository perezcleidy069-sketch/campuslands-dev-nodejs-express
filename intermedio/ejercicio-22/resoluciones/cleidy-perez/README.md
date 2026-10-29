# Intermedio 22 — subida simulada de archivos

API educativa para **Arquitectura 3D**. Accept validated upload metadata without persisting an actual file.

## Requisitos y ejecucion

- Node.js 20 o superior.
- Ejecuta `npm install` y luego `npm start` (por defecto, `http://localhost:3000`).
- Desarrollo: `npm run dev`; pruebas: `npm test`.

## Estructura

- `src/app.js`: configuracion de Express y endpoints.
- `src/repositories/catalog-repository.js`: datos en memoria; se reinician al detener el proceso.
- `src/services/catalog-service.js`: reglas reutilizables del catalogo.
- `src/server.js`: inicio del servidor.

## Ejemplos HTTP

```sh
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/models
curl -X POST http://localhost:3000/api/v1/models -H "Content-Type: application/json" -d '{"name":"Demo 3D architecture","category":"Sample","rating":80,"year":2025}'
```

## Enfoque

Envio simulado: `POST /api/v1/models/upload` con JSON `{"filename":"atrium.glb","mimeType":"model/gltf-binary","size":1200}`; no se almacena el archivo.

## Validacion

`npm install` instala las dependencias; `npm test` ejecuta la suite del ejercicio. No se incluyen base de datos, secretos ni `node_modules`.
