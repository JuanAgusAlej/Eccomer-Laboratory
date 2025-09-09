/*  const cardProductoList = (products) => {
  const htmlcard = document.querySelector("#products-grid");
  htmlcard.innerHTML += `<h2 class="h4 mb-3">Productos</h2>`;

  products.map((product) => {
    htmlcard.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 p-1 rounded-4">
            <img
              width="75"
              src="${product.image}"
              class="card-img-top"
              alt="Producto"
            />
            <div class="card-body">
              <h5 class="card-title">
                ${product.title}
              </h5>
            </div>
          </div>
        </div>
        `;
  });
};

export { cardProductoList };*/

const cardProductoList = (products) => {
  const htmlcard = document.querySelector("#products-grid");
  htmlcard.innerHTML = `<h2 class="h4 mb-3">Productos</h2>`; // Limpia y agrega título

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 p-1 rounded-4">
        <img width="75" src="${product.image}" class="card-img-top" alt="${product.title}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <button class="btn btn-primary mt-auto" data-id="${product.id}">Ver detalle</button>
        </div>
      </div>
    `;

    // Evento para abrir el modal
    col.querySelector("button").addEventListener("click", () => {
      import("../index.js").then((module) => {
        module.mostrarModalProducto(product.id);
      });
    });

    htmlcard.appendChild(col);
  });
};

export { cardProductoList };

const cartDrawer = () => {
  return `
    <div class='offcanvas offcanvas-end'
         data-bs-scroll='true'
         data-bs-backdrop='false'
         tabindex='-1'
         id='cartDrawer'
         aria-labelledby='cartDrawerLabel'
         style='width: 420px;'>
      <div class='offcanvas-header'>
        <h5 class='offcanvas-title' id='cartDrawerLabel'>Tu carrito</h5>
        <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Cerrar'></button>
      </div>
      <div class='offcanvas-body d-flex flex-column'>
        <div id='cartItems' class='list-group flex-grow-1 overflow-auto'>
          <!-- Aquí tus productos -->
        </div>
        <div class='mt-3 border-top pt-3 d-flex justify-content-between'>
          <span class='fw-semibold'>Total:</span>
          <span class='fw-semibold' id='cartTotal'>$0</span>
        </div>
        <div class='mt-3'>
          <button class='btn btn-primary w-100 mb-2' id='btnCheckout'>Finalizar compra</button>
          <button class='btn btn-danger w-100' id='btnClearCart'>Eliminar todos los productos</button>
        </div>
      </div>
    </div>
  `;
};

export { cartDrawer };