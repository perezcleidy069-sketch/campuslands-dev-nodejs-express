# Loadouts de shooters competitivos

API para consultar y crear loadouts. El servicio recibe el repositorio como dependencia, lo que permite probar sus reglas usando un doble controlado sin acceder al repositorio en memoria ni a una base de datos.

## Requisitos y ejecucion

Requiere Node.js 20 o superior.

```bash
npm install
npm test
npm start
```

Servidor: `http://localhost:3000`. Desarrollo: `npm run dev`.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/health` | Estado de la API. |
| GET | `/api/loadouts` | Lista loadouts. |
| GET | `/api/loadouts/:id` | Consulta un loadout. |
| POST | `/api/loadouts` | Crea uno con `name`, `weapon` y `role`. |

```bash
curl http://localhost:3000/api/loadouts
curl -X POST http://localhost:3000/api/loadouts -H "Content-Type: application/json" -d "{\"name\":\"Breach Setup\",\"weapon\":\"Vandal\",\"role\":\"Entry\"}"
```

La suite `node:test` verifica la interaccion del servicio con un repositorio falso: listado, creacion y busqueda, sin mocks de red ni dependencias de almacenamiento externo.
