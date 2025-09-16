import { Router } from "express";
import User from "../models/user.js";
import Pet from "../models/Pet.js";
import { generateUsers, generatePets } from "../utils/mocking.js";
import { hashPassword } from "../utils/crypt.js";

const router = Router();

router.get("/mockingusers", async (_req, res, next) => {
  try {
    const users = await generateUsers(50);
    res.json(users);
  } catch (e) { next(e); }
});

router.get("/mockingpets", (_req, res) => {
  const pets = generatePets(100);
  res.json(pets);
});

router.post("/generateData", async (req, res, next) => {
  try {
    const usersCount = Number(req.body.users || 0);
    const petsCount = Number(req.body.pets || 0);

    if (Number.isNaN(usersCount) || usersCount < 0 || Number.isNaN(petsCount) || petsCount < 0) {
      return res.status(400).json({ error: "Parámetros inválidos: 'users' y 'pets' deben ser numéricos >= 0" });
    }

    const usersDocs = await generateUsers(usersCount);
    const petsDocs = generatePets(petsCount);

    const usersInserted = usersDocs.length ? await User.insertMany(usersDocs.map(u => ({
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      age: u.age,
      password: u.password,
      role: u.role,
      pets: []
    }))) : [];

    const petsInserted = petsDocs.length ? await Pet.insertMany(petsDocs.map(p => ({
      name: p.name, breed: p.breed, age: p.age, adopted: p.adopted
    }))) : [];

    if (usersInserted.length && petsInserted.length) {
      const usersIds = usersInserted.map(u => u._id.toString());
      for (const pet of petsInserted) {
        if (Math.random() < 0.6) {
          const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];
          pet.owner = randomUserId;
          await pet.save();
          await User.findByIdAndUpdate(randomUserId, { $addToSet: { pets: pet._id } });
        }
      }
    }

    let ensuredAdmin = await User.findOne({ role: "admin" }).lean();
    if (!ensuredAdmin) {
      ensuredAdmin = await User.create({
        first_name: "Admin",
        last_name: "Root",
        email: "admin@example.com",
        age: 30,
        password: await hashPassword("coder123"),
        role: "admin",
        pets: []
      });
    }

    res.status(201).json({
      message: "Datos generados e insertados correctamente",
      usersInserted: usersInserted.length,
      petsInserted: petsInserted.length,
      ensuredAdmin: { email: ensuredAdmin.email, role: ensuredAdmin.role }
    });
  } catch (e) { next(e); }
});

export default router;
