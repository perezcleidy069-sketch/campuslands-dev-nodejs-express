# API refactorizada de clubes de futbol

API de clubes y ligas de futbol/futbol sala organizada en rutas, controladores, servicios y repositorio en memoria. El servicio ofrece busqueda textual y paginacion para conservar una interfaz uniforme entre las capas.

## Requisitos y ejecucion

Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

Servidor: `http://localhost:3000`; desarrollo: `npm run dev`.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Estado de la API. |
| GET | `/api/clubs` | Lista clubes, opcionalmente filtrados con `q`, `page` y `limit`. |
| GET | `/api/clubs/:id` | Consulta un club. |
| POST | `/api/clubs` | Crea un club con `name`, `league` y `city`. |

Ejemplo de busqueda paginada:

```bash
curl "http://localhost:3000/api/clubs?q=united&page=1&limit=2"
curl -X POST http://localhost:3000/api/clubs -H "Content-Type: application/json" -d "{\"name\":\"Harbor United\",\"league\":\"Futsal Premier\",\"city\":\"Cartagena\"}"
```

La respuesta de listado contiene `data` y `pagination`. La validacion incorrecta devuelve `400`; un club inexistente devuelve `404`. Los cambios se mantienen solo en memoria.
