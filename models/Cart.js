const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true, default: 1 },
        }
    ]
});
module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
