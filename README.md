# Backend Mocks API

Proyecto backend en **Node.js + Express + MongoDB** para la generación de datos mock y persistencia en base de datos.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Faker.js
- bcrypt
- Nodemon
- Thunder Client (testing de endpoints)

## Estructura del proyecto

src/
├── app.js
├── config/
│ └── mongo.js
├── mocks/
│ ├── users.mock.js
│ └── pets.mock.js
├── routes/
│ └── mocks.router.js
├── models/
│ ├── user.model.js
│ └── pet.model.js

## Instalación y ejecución

1. Clonar el repositorio:

git clone https://github.com/Lb004/backend-mocks.git

## Instalar dependencias:

npm install

## Levantar el servidor:

npm run dev

## El servidor se ejecuta en:

http://localhost:8080

## Endpoints disponibles
🔹 Generar datos mock e insertarlos en MongoDB

## POST

/api/mocks/generateData
Body (JSON):
{
  "users": 5,
  "pets": 10
}
Respuesta:
{
  "status": "success",
  "message": "Datos insertados"
}

## Obtener usuarios

GET

/api/users
 Obtener mascotas
 GET
/api/pets

## La conexión a MongoDB se maneja desde:

src/config/mongo.js