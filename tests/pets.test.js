import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import Pet from "../models/Pet.js";

describe("Pets API (adoption.router equivalent)", function() {
  let mongod, uri;
  before(async function() {
    this.timeout(60000);
    mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async function() {
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async function() {
    await Pet.deleteMany({});
    await Pet.create([
      { name: "Fido", species: "Dog", age: 3 },
      { name: "Mittens", species: "Cat", age: 2 }
    ]);
  });

  it("GET /api/pets should return list of pets", async function() {
    const res = await request(app).get("/api/pets").expect(200);
    expect(res.body).to.be.an("array").with.lengthOf(2);
    expect(res.body[0]).to.have.property("name");
  });

  it("GET /api/pets/:id should return single pet", async function() {
    const pet = await Pet.findOne({ name: "Fido" }).lean();
    const res = await request(app).get(`/api/pets/${pet._id}`).expect(200);
    expect(res.body).to.have.property("_id");
    expect(res.body.name).to.equal("Fido");
  });

  it("GET /api/pets/:id should return 404 for non-existing id", async function() {
    const fakeId = new mongoose.Types.ObjectId();
    await request(app).get(`/api/pets/${fakeId}`).expect(404);
  });

  it("GET /api/pets/:id should handle invalid id format with 500", async function() {
    await request(app).get(`/api/pets/invalid-id`).expect(500);
  });
});
