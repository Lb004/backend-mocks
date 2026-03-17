import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import { connectMongoDB } from "./config/mongo.js";

const app = express();

app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Backend Mocks API",
      description: "API para generación de datos mock y adopción de mascotas"
    }
  },
  apis: ["./src/docs/**/*.yaml"]
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas
app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);

// GET users y pets directamente
import User from "./models/User.js";
import Pet from "./models/Pet.js";

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json({ status: "success", payload: users });
});

app.get("/api/pets", async (req, res) => {
  const pets = await Pet.find();
  res.json({ status: "success", payload: pets });
});

connectMongoDB();

export { app };

app.listen(8080, () => {
  console.log("🚀 Servidor escuchando en puerto 8080");
});