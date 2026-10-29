# Entrega avanzada — ejercicio 15

## Cabeceras de seguridad para comida callejera

API REST en Express con capas separadas de rutas, controlador/servicio y composición de aplicación. La funcionalidad central implementa **security** con estado en memoria; no requiere servicios externos.

## Requisitos y ejecución

- Node.js 20 o superior.
- `npm install`
- `npm test`
- `npm start` (servidor en `http://localhost:3000`).

## HTTP

Salud: `GET /health`

Listar: `GET /api/v1/stalls`

Ejecutar la operación principal: `POST /api/v1/stalls/actions`

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/stalls
curl -X POST http://localhost:3000/api/v1/stalls/actions -H "Content-Type: application/json" -H "Idempotency-Key: demo-1" -H "x-role: instructor" -d '{"action":"create","name":"Tacos nocturnos","category":"tacos"}'
```

La operación de demostración es {"action":"create","name":"Tacos nocturnos","category":"tacos"}. Los datos se mantienen solo durante la vida del proceso.

## Estructura

- `src/app.js`: configura middleware y composición.
- `src/server.js`: inicia el listener HTTP.
- `src/routes/`: rutas HTTP.
- `src/services/`: reglas de negocio y estado simulado.
- `src/config/`: configuración segura con valores por defecto.
- `src/test/`: prueba de integración HTTP con `node:test`.
