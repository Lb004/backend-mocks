# Backend Mocks API

Proyecto backend en **Node.js + Express + MongoDB** para la generación de datos mock y persistencia en base de datos.

## 🐳 Imagen en Docker Hub

```
docker pull lucasb12/backend-mocks
```

> **Link:** https://hub.docker.com/r/lucasb12/backend-mocks

---

## Tecnologías utilizadas

- Node.js 22
- Express 5
- MongoDB + Mongoose
- Faker.js
- bcrypt
- Swagger (swagger-jsdoc + swagger-ui-express)
- Mocha + Chai + Supertest (testing)
- Docker

---

## Estructura del proyecto

```
src/
├── app.js
├── config/
│   └── mongo.js
├── docs/
│   └── users.yaml
├── mocks/
│   ├── users.mock.js
│   └── pets.mock.js
├── models/
│   ├── User.js
│   └── Pet.js
└── routes/
    ├── mocks.router.js
    └── adoption.router.js
test/
└── adoption.test.js
Dockerfile
```

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lb004/backend-mocks.git
cd backend-mocks
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar el servidor

```bash
npm run dev
```

El servidor corre en: `http://localhost:8080`

---

## 🐳 Ejecutar con Docker

### Opción A — Usar la imagen de Docker Hub

```bash
docker pull lucasb12/backend-mocks
docker run -p 8080:8080 lucasb12/backend-mocks
```

### Opción B — Construir la imagen localmente

```bash
docker build -t backend-mocks .
docker run -p 8080:8080 backend-mocks
```

---

## Endpoints disponibles

### Mocks

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/mocks/mockingpets` | Genera 50 mascotas mock (sin insertar en DB) |
| GET | `/api/mocks/mockingusers` | Genera 50 usuarios mock (sin insertar en DB) |
| POST | `/api/mocks/generateData` | Inserta users y pets en MongoDB |

**Body para generateData:**
```json
{
  "users": 5,
  "pets": 10
}
```

### Adopciones

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/adoptions` | Obtiene todas las adopciones |
| GET | `/api/adoptions/:uid` | Obtiene mascotas de un usuario |
| POST | `/api/adoptions/:uid/:pid` | Adopta una mascota |

### Usuarios y Mascotas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Lista todos los usuarios |
| GET | `/api/pets` | Lista todas las mascotas |

---

## 📄 Documentación Swagger

Con el servidor corriendo, accedé a:

```
http://localhost:8080/apidocs
```

---

## 🧪 Tests

```bash
npm test
```

Los tests cubren todos los endpoints de `adoption.router.js`:
- GET `/api/adoptions`
- GET `/api/adoptions/:uid` (éxito y 404)
- POST `/api/adoptions/:uid/:pid` (éxito, mascota ya adoptada, usuario no existe, mascota no existe)

---

## Conexión a MongoDB

La conexión se configura en `src/config/mongo.js`.  
Por defecto conecta a: `mongodb://localhost:27017/mocksdb`