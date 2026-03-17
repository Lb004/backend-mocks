import supertest from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { app } from "../src/app.js";
import User from "../src/models/User.js";
import Pet from "../src/models/Pet.js";

const requester = supertest(app);

describe("Testing Adoption Router", () => {
  let testUserId;
  let testPetId;
  let adoptedPetId;

  before(async () => {
    // Esperar a que la conexión existente de app.js esté lista
    await new Promise((resolve) => {
      if (mongoose.connection.readyState === 1) return resolve();
      mongoose.connection.once("connected", resolve);
    });

    // Limpiar datos de tests anteriores
    await User.deleteMany({ email: "test@test.com" });
    await Pet.deleteMany({ name: { $in: ["Firulais", "Pelusa"] } });

    const user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      password: "hashedpassword",
      role: "user",
      pets: []
    });
    testUserId = user._id.toString();

    const pet = await Pet.create({
      name: "Firulais",
      species: "dog",
      age: 3,
      adopted: false,
      owner: null
    });
    testPetId = pet._id.toString();

    const adoptedPet = await Pet.create({
      name: "Pelusa",
      species: "cat",
      age: 2,
      adopted: true,
      owner: testUserId
    });
    adoptedPetId = adoptedPet._id.toString();
  });

  after(async () => {
    await User.deleteMany({ email: "test@test.com" });
    await Pet.deleteMany({ name: { $in: ["Firulais", "Pelusa"] } });
  });

  describe("GET /api/adoptions", () => {
    it("Debe retornar status 200 y un array de adoptions", async () => {
      const { statusCode, body } = await requester.get("/api/adoptions");
      expect(statusCode).to.equal(200);
      expect(body).to.have.property("status", "success");
      expect(body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:uid", () => {
    it("Debe retornar las mascotas de un usuario existente", async () => {
      const { statusCode, body } = await requester.get(`/api/adoptions/${testUserId}`);
      expect(statusCode).to.equal(200);
      expect(body).to.have.property("status", "success");
      expect(body.payload).to.be.an("array");
    });

    it("Debe retornar 404 si el usuario no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const { statusCode, body } = await requester.get(`/api/adoptions/${fakeId}`);
      expect(statusCode).to.equal(404);
      expect(body).to.have.property("status", "error");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("Debe adoptar una mascota correctamente", async () => {
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUserId}/${testPetId}`
      );
      expect(statusCode).to.equal(200);
      expect(body).to.have.property("status", "success");
      expect(body.message).to.equal("Mascota adoptada correctamente");
    });

    it("Debe marcar la mascota como adoptada en la DB", async () => {
      const pet = await Pet.findById(testPetId);
      expect(pet.adopted).to.equal(true);
      expect(pet.owner.toString()).to.equal(testUserId);
    });

    it("Debe agregar la mascota al array pets del usuario", async () => {
      const user = await User.findById(testUserId);
      expect(user.pets).to.include(testPetId);
    });

    it("Debe retornar 400 si la mascota ya fue adoptada", async () => {
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUserId}/${adoptedPetId}`
      );
      expect(statusCode).to.equal(400);
      expect(body).to.have.property("status", "error");
    });

    it("Debe retornar 404 si el usuario no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${fakeId}/${testPetId}`
      );
      expect(statusCode).to.equal(404);
      expect(body).to.have.property("status", "error");
      expect(body.message).to.equal("Usuario no encontrado");
    });

    it("Debe retornar 404 si la mascota no existe", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const { statusCode, body } = await requester.post(
        `/api/adoptions/${testUserId}/${fakeId}`
      );
      expect(statusCode).to.equal(404);
      expect(body).to.have.property("status", "error");
      expect(body.message).to.equal("Mascota no encontrada");
    });
  });
});