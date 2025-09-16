// dao/models/pet.js
import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: "dog" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", default: null },
});

const PetModel = mongoose.model("pets", petSchema);

export default PetModel;
