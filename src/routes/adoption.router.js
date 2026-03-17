import { Router } from "express";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

// GET /api/adoptions — obtener todas las adopciones
router.get("/", async (req, res) => {
  try {
    // Retornamos los usuarios que tienen pets adoptadas
    const adoptions = await User.find({ pets: { $not: { $size: 0 } } });
    res.json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /api/adoptions/:uid — obtener adopciones de un usuario específico
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }

    res.json({ status: "success", payload: user.pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST /api/adoptions/:uid/:pid — adoptar una mascota
router.post("/:uid/:pid", async (req, res) => {
  try {
    const { uid, pid } = req.params;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }

    const pet = await Pet.findById(pid);
    if (!pet) {
      return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    }

    if (pet.adopted) {
      return res.status(400).json({ status: "error", message: "La mascota ya fue adoptada" });
    }

    // Actualizar mascota como adoptada y asignar owner
    await Pet.findByIdAndUpdate(pid, { adopted: true, owner: uid });

    // Agregar mascota al array de pets del usuario
    await User.findByIdAndUpdate(uid, { $push: { pets: pid } });

    res.json({ status: "success", message: "Mascota adoptada correctamente" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;