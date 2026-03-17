import { Router } from "express";
import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockPets } from "../mocks/pets.mock.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);
  res.json({ status: "success", payload: pets });
});

router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    const usersToInsert = mockUsers.map(({ _id, ...rest }) => rest);
    const petsToInsert = mockPets.map(({ _id, ...rest }) => rest);

    await User.insertMany(usersToInsert);
    await Pet.insertMany(petsToInsert);

    res.json({ status: "success", message: "Datos insertados correctamente" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;