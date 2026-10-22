# API de campos de airsoft

API REST para consultar y administrar campos de airsoft. Usa MongoDB para guardar los datos.

## Integrandes: 
Alejo Ezequiel Fernandez (Rutas, controladores, MongoDB y servicios).
Milagros Fernandez (Manejo de errores, validaciones, Middleware).

## Dependencias

- `express`: `^5.2.1`
- `mongoose`: `^9.11.2`

## Instalar y ejecutar

Requisitos: Node.js 20.6 o posterior, npm y MongoDB.

1. Instalá dependencias: `npm install`
2. Copiá `.env.example` como `.env` y completá sus valores.
3. Iniciá la API: `npm run dev` (desarrollo) o `npm start`.
4. Opcional: cargá los datos de ejemplo con `npm run seed`. **Esto borra los campos existentes antes de cargar la seed.**

## Variables

| Variable | Uso |
| --- | --- |
| `MONGODB_URL` | URI de conexión a MongoDB. Requerida. |
| `CLAVE_ADMIN` | Clave para las rutas protegidas. Requerida. |
| `PUERTO` | Puerto del servidor; por defecto `3000`. |
| `NODE_ENV` | Entorno; por defecto `development`. |

Ejemplo:

```dotenv
MONGODB_URL=mongodb://127.0.0.1:27017/campos
CLAVE_ADMIN=una-clave-local
PUERTO=3000
NODE_ENV=development
```

## Rutas

Base: `http://localhost:3000`. Las rutas marcadas con 🔒 requieren el encabezado `x-api-key: una-clave-local`.

| Método y ruta | Ejemplo |
| --- | --- |
| `GET /api/salud` | `curl http://localhost:3000/api/salud` |
| `GET /api/campos` | `curl "http://localhost:3000/api/campos?ubicacion=quilmes&tamano=grande"` |
| `GET /api/campos/:id` | `curl http://localhost:3000/api/campos/671234567890abcdef123456` |
| `POST /api/campos` 🔒 | `curl -X POST http://localhost:3000/api/campos -H "x-api-key: una-clave-local" -H "Content-Type: application/json" -d "{\"nombre\":\"Campo Norte\",\"tamano\":\"mediano\",\"ubicacion\":\"quilmes\",\"descripcion\":\"predio arbolado\",\"horario\":\"10 a 22\"}"` |
| `PATCH /api/campos/:id` 🔒 | `curl -X PATCH http://localhost:3000/api/campos/671234567890abcdef123456 -H "x-api-key: una-clave-local" -H "Content-Type: application/json" -d "{\"horario\":\"09 a 20\"}"` |
| `DELETE /api/campos/:id` 🔒 | `curl -X DELETE http://localhost:3000/api/campos/671234567890abcdef123456 -H "x-api-key: una-clave-local"` |
| `POST /api/campos/:id/organizar` 🔒 | `curl -X POST http://localhost:3000/api/campos/671234567890abcdef123456/organizar -H "x-api-key: una-clave-local"` |

`POST` requiere `nombre`, `tamano` (`chico`, `mediano` o `grande`), `ubicacion`, `descripcion` y `horario`. `PATCH` permite modificar esos campos y `contacto`.

## Decisiones

1. **MongoDB y Mongoose:** persistencia y validación de los campos.
2. **Rutas, controladores y servicio separados:** responsabilidades claras y código organizado.
3. **Clave de administrador para modificar datos:** restringe las operaciones de escritura a clientes autorizados.
4. **Disponibilidad de cada campo:** se representa con un valor booleano que cambia al alquilarlo. Esto deja preparada la API para que, en el futuro, los usuarios puedan sumarse automáticamente a partidas públicas en campos disponibles.
