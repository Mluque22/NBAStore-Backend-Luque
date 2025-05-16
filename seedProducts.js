const mongoose = require("mongoose");
const Product = require("./models/Product");
const fs = require("fs");

async function importProducts() {
    try {
        await mongoose.connect("mongodb://localhost:27017/nba-store");
        const productsData = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

        await Product.deleteMany({});
        await Product.insertMany(productsData);

        console.log("Productos importados correctamente.");
    } catch (error) {
        console.error("Error importando productos:", error);
    } finally {
        mongoose.disconnect();
    }
}

importProducts();
