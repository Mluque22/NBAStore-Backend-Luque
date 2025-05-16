document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById('products');
            container.innerHTML = '';
            products.forEach(product => {
                container.innerHTML += `
          <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
            <div class="product-info">
              <h3>${product.name}</h3>
              <p>Equipo: ${product.team}</p>
              <p>Precio: $${product.price}</p>
              <p>Stock: ${product.stock}</p>
            </div>
          </div>`;
            });
        })
        .catch(console.error);
});
