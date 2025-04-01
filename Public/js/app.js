// Obtener productos de la API y mostrarlos en el frontend
fetch("/products")
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById("products");
        container.innerHTML = products.map(p =>
            `<div class="product-card">
                <h3>${p.name}</h3>
                <p>Equipo: ${p.team}</p>
                <p>Precio: $${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="addToCart(${p.id})">Añadir al carrito</button>
            </div>`
        ).join("");
    });

// Función para agregar un producto al carrito
function addToCart(productId) {
    fetch(`/carts/add/${productId}`, { method: "POST" })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.log(error));
}
