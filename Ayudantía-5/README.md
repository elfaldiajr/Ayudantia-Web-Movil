# Ayudantía-5 Backend con NestJS

## Objetivo

El objetivo de la ayudantía es implementar un pequeño backend que cumpla con los siguientes requerimientos:

* Utilizar el framework **NestJS** para el servidor HTTP
* Utilizar un **docker-compose.yml** para la imagen de la base de datos de MongoDB
* Crear dos recursos: **User** y **Task**, donde un User tiene 0..* Task
* Conectar la base de datos utilizando **MongooseModule**
* Implementar lógica de sesión de usuario (`/register` y `/login`) utilizando **bcrypt** y **JWT**
* Implementar **Guards** para la verificación de los tokens
* Generar permisos especiales dependiendo del rol del usuario

---

## Tecnologías

- Node.js
- NestJS
- MongoDB
- Mongoose
- Docker
- JWT (JSON Web Tokens)
- bcrypt

---

## Instalación

```bash
# Instalar dependencias
npm install

# Levantar MongoDB con Docker
docker-compose up -d

# Ejecutar en desarrollo
npm run start:dev
```

---

## Variables de Entorno

Crear archivo `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/ayudantia-db
JWT_SECRET=tu_clave_secreta
PORT=3000
```