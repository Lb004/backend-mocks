import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mocksdb";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};