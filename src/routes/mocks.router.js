import { Router } from "express";
import { generateMockUsers } from "../mocks/users.mock.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const router = Router();

router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;

  const usersToInsert = [];
  for (let i = 0; i < users; i++) {
    usersToInsert.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("coder123", 10),
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }

  const petsToInsert = [];
  for (let i = 0; i < pets; i++) {
    petsToInsert.push({
      name: faker.animal.dog(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 })
    });
  }

  await User.insertMany(usersToInsert);
  await Pet.insertMany(petsToInsert);

  res.json({ status: "success", message: "Datos insertados" });
});

export default router;