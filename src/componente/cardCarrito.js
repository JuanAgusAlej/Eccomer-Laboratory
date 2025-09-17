const cardCarrito = (product) => {
  return `
    <div class="list-group-product d-flex align-items-center gap-2" data-id="${product.id}">
      <img src="${product.image}" alt="${product.title}" width="48" height="48" class="rounded">
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-start">
          <div class="me-2">
            <div class="fw-semibold small">${product.title}</div>
            <div class="text-body-secondary small">Precio unitario: $ ${(product.price)}</div>
          </div>
          <button class="btn btn-sm btn-outline-danger btn-remove">&times;</button>
        </div>
        <div class="d-flex align-items-center gap-2 mt-2">
          <button class="btn btn-sm btn-outline-secondary btn-restar" ${product.qty <= 1 ? 'disabled' : ''}>-</button>
          <span class="fw-semibold qty">${product.qty}</span>
          <button class="btn btn-sm btn-outline-secondary btn-sumar">+</button>
          <span class="ms-auto fw-semibold line-total">$ ${(product.price * product.qty)}</span>
        </div>
      </div>
    </div>
  `;
};

export { cardCarrito };