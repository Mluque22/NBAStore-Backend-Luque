import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, default: "" },
  age: { type: Number, default: 0 },
  adopted: { type: Boolean, default: false }
}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
