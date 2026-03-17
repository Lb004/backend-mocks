# Imagen base oficial de Node.js
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero (para cachear dependencias)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa la app
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "src/app.js"]