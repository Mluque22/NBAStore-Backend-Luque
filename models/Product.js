const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    team: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
