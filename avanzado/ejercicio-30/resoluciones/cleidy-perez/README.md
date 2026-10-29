# Entrega avanzada — ejercicio 30

## Proyecto final avanzado para motocicletas

API REST en Express con capas separadas de rutas, controlador/servicio y composición de aplicación. La funcionalidad central implementa **final** con estado en memoria; no requiere servicios externos.

## Requisitos y ejecución

- Node.js 20 o superior.
- `npm install`
- `npm test`
- `npm start` (servidor en `http://localhost:3000`).

## HTTP

Salud: `GET /health`

Listar: `GET /api/v1/motorcycles`

Ejecutar la operación principal: `POST /api/v1/motorcycles/actions`

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/motorcycles
curl -X POST http://localhost:3000/api/v1/motorcycles/actions -H "Content-Type: application/json" -H "Idempotency-Key: demo-1" -H "x-role: instructor" -d '{"action":"create","brand":"Yamaha","model":"MT-07","year":2025}'
```

La operación de demostración es {"action":"create","brand":"Yamaha","model":"MT-07","year":2025}. Los datos se mantienen solo durante la vida del proceso.

## Estructura

- `src/app.js`: configura middleware y composición.
- `src/server.js`: inicia el listener HTTP.
- `src/routes/`: rutas HTTP.
- `src/services/`: reglas de negocio y estado simulado.
- `src/config/`: configuración segura con valores por defecto.
- `src/test/`: prueba de integración HTTP con `node:test`.
