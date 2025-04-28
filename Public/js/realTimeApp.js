const socket = io();

socket.on("updateProducts", (products) => {
    const productListDiv = document.getElementById("product-list");
    productListDiv.innerHTML = products.map((product) => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Equipo: ${product.team}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
        </div>
    `).join("");
});

// Agregar un nuevo producto
const form = document.getElementById("add-product-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        team: document.getElementById("team").value,
        stock: parseInt(document.getElementById("stock").value),
    };

    socket.emit("addProduct", newProduct);
    form.reset();
});

// Eliminar un producto
function deleteProduct() {
    const productId = parseInt(document.getElementById("delete-product-id").value);
    socket.emit("deleteProduct", productId);
}
