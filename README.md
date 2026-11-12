# StrikeAr: campos de airsoft

Aplicación web para consultar y administrar campos de airsoft. El proyecto incluye una API REST con Express y MongoDB, y una interfaz React construida con Vite.

## Integrantes

- Alejo Ezequiel Fernandez: rutas, controladores, MongoDB y servicios.
- Milagros Fernandez: manejo de errores, validaciones, middleware, cuentas, roles, front.
## Requisitos

- Node.js compatible con las versiones instaladas de Express y Vite.
- npm.
- MongoDB local o una URI de MongoDB Atlas.

## Configuración

### API

Desde la carpeta raíz, instala las dependencias y crea el archivo `.env` a partir de `.env.example`. Completa los valores locales:

```dotenv
PUERTO=3000
NODE_ENV=development
MONGODB_URL=mongodb://127.0.0.1:27017/strikear
CLAVE_ADMIN=una-clave-local
JWT_SECRET=reemplazar-por-un-secreto-largo-y-aleatorio
FRONTEND_URL=http://localhost:5173
```

`FRONTEND_URL` acepta uno o varios orígenes separados por comas, sin rutas. Por ejemplo: `http://localhost:5173,https://mi-sitio.example`.
`CLAVE_ADMIN` sigue siendo necesaria para iniciar la API según la configuración actual; las rutas de escritura documentadas en este README se autorizan mediante JWT y rol, no mediante una API key.

```bash
npm install
npm run dev
```

La API escucha por defecto en `http://localhost:3000`. Para ejecutarla sin el modo de recarga automática usa `npm start`.

### Frontend

En otra terminal, desde `mi-app/`:

```bash
npm install
npm run dev
```

Vite muestra la URL local del frontend (por defecto `http://localhost:5173`). La aplicación usa `http://localhost:3000` como API por defecto. Para cambiarla, crea `mi-app/.env`:

```dotenv
VITE_API_URL=http://localhost:3000
```

Validaciones del frontend:

```bash
npm run lint
npm run build
```

## Funcionalidad

- Catálogo de campos obtenido desde la API, con filtro por ubicación enviado como parámetro de consulta.
- Registro con contraseña derivada mediante `scrypt` y sal aleatoria; las respuestas no incluyen contraseña ni sal.
- Inicio de sesión que devuelve un JWT con expiración de cuatro horas.
- El registro público siempre crea usuarios con rol `usuario`; no acepta que el cliente asigne `admin`.
- Relación entre campos y usuarios mediante `Campo.admin`, referencia a `User`. Al crear un campo, se guarda el usuario autenticado. Las consultas de listado y detalle usan `populate` y exponen del usuario relacionado solo `nombre` y `creacion`.
- Interfaz con portada, catálogo, inicio de sesión y registro.

## Autenticación y roles

Las rutas protegidas esperan el JWT en el encabezado:

```http
Authorization: Bearer {jwt}
```

- Sin token o con token inválido/expirado: `401 Unauthorized`.
- Token válido sin rol `admin` en una ruta exclusiva de administración: `403 Forbidden`.
- Crear un campo requiere una sesión válida.
- Modificar, eliminar, organizar campos y promover usuarios requiere rol `admin`.

El primer administrador debe crearse manualmente en MongoDB, asignando `rol: "admin"` a una cuenta registrada. Luego un administrador autenticado puede promover otro usuario:

```http
PATCH /api/auth/usuarios/:id/admin
Authorization: Bearer {jwt-de-admin}
```

## Rutas de la API

Base local: `http://localhost:3000`.

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `GET` | `/api/salud` | Público | Estado del servidor. |
| `GET` | `/api/campos` | Público | Lista campos; admite filtros `ubicacion`, `tamano` y `disponibilidad`. |
| `GET` | `/api/campos/:id` | Público | Obtiene un campo por ID. |
| `POST` | `/api/campos` | Sesión | Crea un campo asociado al usuario autenticado. |
| `PATCH` | `/api/campos/:id` | Admin | Modifica los campos permitidos. |
| `DELETE` | `/api/campos/:id` | Admin | Elimina un campo. |
| `POST` | `/api/campos/:id/organizar` | Admin | Cambia la disponibilidad del campo. |
| `POST` | `/api/auth/registro` | Público | Registra un usuario con rol `usuario`. |
| `POST` | `/api/auth/login` | Público | Valida credenciales y devuelve un JWT. |
| `PATCH` | `/api/auth/usuarios/:id/admin` | Admin | Promueve un usuario a administrador. |

Para crear un campo, el cuerpo JSON requiere `nombre`, `tamano` (`chico`, `mediano` o `grande`), `ubicacion`, `descripcion` y `horario`. El `admin` relacionado se toma del JWT, no del cuerpo enviado por el cliente.

Ejemplo de registro:

```json
{
  "nombre": "Nombre de usuario",
  "email": "persona@example.com",
  "password": "una-contraseña"
}
```

## Datos de ejemplo

`npm run seed` elimina los campos actuales antes de insertar los datos de ejemplo y requiere que existan al menos tres usuarios en MongoDB. Úsalo solo en una base de desarrollo que se pueda borrar.

El script `userseed` es anterior al esquema actual de usuarios y no debe usarse para crear cuentas. Registra usuarios desde la interfaz o desde `POST /api/auth/registro`.

## Estructura principal

```text
src/                  API Express, modelos, rutas, controladores y servicios
mi-app/src/           Aplicación React/Vite
pruebas/              Capturas de pruebas manuales de la API
```
