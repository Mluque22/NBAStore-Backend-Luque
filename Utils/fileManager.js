const fs = require("fs");

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo el archivo:", filePath, error.message);
        return [];
    }
}

function writeFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error escribiendo el archivo:", filePath, error.message);
    }
}

module.exports = { readFile, writeFile };
