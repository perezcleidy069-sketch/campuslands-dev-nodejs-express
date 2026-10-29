# API de inspecciones de soldadura

API educativa Express para consultar inspecciones de soldadura. El ejercicio practica pruebas automatizadas con el ejecutor integrado `node:test` y aserciones de `node:assert/strict`, sin instalar frameworks de testing.

## Requisitos e instalacion

- Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

La API escucha en `http://localhost:3000`. Para desarrollo con reinicio automatico:

```bash
npm run dev
```

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Estado de la API. |
| GET | `/api/v1/welds` | Lista las inspecciones. Admite `?category=TIG`. |
| GET | `/api/v1/welds/:id` | Obtiene una inspeccion. |
| POST | `/api/v1/welds` | Registra una inspeccion validada. |

Ejemplo para crear una inspeccion:

```bash
curl -X POST http://localhost:3000/api/v1/welds \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Frame Joint D\",\"category\":\"TIG\",\"rating\":96,\"year\":2025}"
```

## Pruebas

`npm test` ejecuta los casos de `test/catalog.test.js`: listado de registros iniciales, filtro insensible a mayusculas/minusculas y creacion con consulta por ID. Los datos se guardan en memoria y se reinician al detener el servidor.
