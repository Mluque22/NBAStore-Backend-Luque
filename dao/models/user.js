// dao/models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pets", default: [] }],
    },
    { timestamps: true }
);

// Nombre de la colección: "users"
const UserModel = mongoose.model("users", userSchema);

export default UserModel;
