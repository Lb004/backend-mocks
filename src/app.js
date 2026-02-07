import express from "express";
import mocksRouter from "./routes/mocks.router.js";
import { connectMongoDB } from "./config/mongo.js";

const app = express();

app.use(express.json());
app.use("/api/mocks", mocksRouter);

connectMongoDB();

app.listen(8080, () => {
  console.log("🚀 Servidor escuchando en puerto 8080");
});