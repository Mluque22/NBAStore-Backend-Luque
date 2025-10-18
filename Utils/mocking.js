import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { hashPassword } from "./crypt.js";


const randomRole = () => (Math.random() < 0.15 ? "admin" : "user");

export async function generateUser(index = 0) {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  const email = `${first}.${last}.${index}.${faker.string.alphanumeric(6)}@example.com`.toLowerCase();
  const password = await hashPassword("coder123");
  const now = new Date();

  return {
    _id: new mongoose.Types.ObjectId(),
    first_name: first,
    last_name: last,
    email,
    age: faker.number.int({ min: 18, max: 70 }),
    password,
    role: randomRole(),
    pets: [],
    createdAt: now,
    updatedAt: now,
    __v: 0
  };
}

export async function generateUsers(count = 1) {
  const arr = [];
  for (let i = 0; i < count; i++) arr.push(await generateUser(i));
  return arr;
}

export function generatePet(index = 0) {
  const name = faker.person.firstName();
  const breed = faker.animal.dog();
  const age = faker.number.int({ min: 0, max: 17 });
  const now = new Date();

  return {
    _id: new mongoose.Types.ObjectId(),
    name, breed, age,
    adopted: faker.datatype.boolean(),
    createdAt: now,
    updatedAt: now,
    __v: 0
  };
}

export function generatePets(count = 1) {
  return Array.from({ length: count }, (_, i) => generatePet(i));
}
