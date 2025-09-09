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
