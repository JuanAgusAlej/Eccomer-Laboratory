const cardProductoList = (products) => {
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

export { cardProductoList };
