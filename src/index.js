import { fetchData, fetchDataDetallado, SearchProduct } from "./api.js";
import { cardProductoList } from "./componente/cardProducto.js";
import { cardCarrito } from "./componente/cardCarrito.js";
import { agregarItem, incrementarItem, restarItem, borrarItem, limparCart, getCart } from "./localStorage.js";

const listaDeProductos = async () => {
  try {
    const products = await fetchData();
    cardProductoList(products);
    return products;
  } catch (err) {
    console.error(err);
  }
};

const setupSearch = () => {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();

    if (searchText.length >= 1) {
      SearchProduct(searchText)
        .then(filteredProducts => {
          cardProductoList(filteredProducts);
        })
        .catch(error => {
          console.error("Error en búsqueda:", error);
        });
    } else if (searchText.length === 0) {
      listaDeProductos();
    }
  });
};


const productoDetallado = async (id) => {
  try {
    const product = await fetchDataDetallado(id);
    return product;
  } catch (err) {
    console.error(err);
  }
};

const mostrarModalProducto = async (id) => {
  try {
    const producto = await productoDetallado(id);

    document.getElementById("detalleProductoLabel").textContent = producto.title;
    document.getElementById("imagenProducto").src = producto.image;
    document.getElementById("imagenProducto").alt = producto.title;
    document.getElementById("nombreProducto").textContent = producto.title;
    document.getElementById("precioProducto").textContent = `$${producto.price}`;
    document.getElementById("descripcionProducto").textContent = producto.description;

    if (window.innerWidth < 576) {
      document.getElementById('imagenProducto').style.maxHeight = '300px';
    }

    const modal = new bootstrap.Modal(document.getElementById("detalleProducto"));
    const btnAgregar = document.querySelector('#detalleProducto .btn-success');
    if (btnAgregar) {
      btnAgregar.dataset.id = producto.id;
      btnAgregar.dataset.title = producto.title;
      btnAgregar.dataset.price = producto.price;
      btnAgregar.dataset.image = producto.image;
      btnAgregar.addEventListener('click', () => {
        try {
          agregarItem({
            id: Number(btnAgregar.dataset.id) || producto.id,
            title: btnAgregar.dataset.title || producto.title,
            price: btnAgregar.dataset.price || producto.price,
            image: btnAgregar.dataset.image || producto.image
          });

          modal.hide();
          const txt  = document.getElementById('producto-agregado');
          if (txt) txt.textContent = ` Se agrego "${producto.title}" agregado al carrito.`;
          const confirmModalEl = document.getElementById('modal-producto-agregado');
          if (confirmModalEl) {
            const confirmModal = new bootstrap.Modal(confirmModalEl);
            confirmModal.show();
          }
        } catch (error) {
          console.error("Error al agregar el producto:", error);
        }
      }, { once: true });
    }
    modal.show();
  } catch (err) {
    console.error("Error al mostrar el detalle:", err);
  }
};

export { mostrarModalProducto };

document.addEventListener("DOMContentLoaded", () => {
  listaDeProductos();
  setupSearch();
});

const renderCart = () => {
  const itemCard = document.getElementById('cartItems');
  const totalCard = document.getElementById('cartTotal');
  if (!itemCard) return;
  const cart = getCart();
  itemCard.innerHTML = cart.map(cardCarrito).join('');
  if (totalCard) {
    const total = cart.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.qty) || 0), 0);
    totalCard.textContent = `$${total.toFixed(2)}`;
  }

  const badge = document.getElementById('cardBadge');
  if (badge) {
    badge.textContent = cart.length > 0 ? cart.length : '';
    badge.classList.toggle('visually-hidden', cart.length === 0);
  }
};

document.addEventListener('DOMContentLoaded', renderCart);
document.addEventListener('cartUpdated', renderCart);

document.addEventListener('click', (e) => {
  const sumar = e.target.closest('.btn-sumar');
  if (sumar) {
    const id = Number(sumar.closest('[data-id]')?.dataset?.id || 0);
    if (id) incrementarItem(id);
    return;
  }
  const restar = e.target.closest('.btn-restar');
  if (restar) {
    const id = Number(restar.closest('[data-id]')?.dataset?.id || 0);
    if (id) restarItem(id);
    return;
  }
  const eliminar = e.target.closest('.btn-remove');
  if (eliminar) {
    const id = Number(eliminar.closest('[data-id]')?.dataset?.id || 0);
    if (id) borrarItem(id);
    return;
  }
  if (e.target && e.target.id === 'btnClearCart') {
    limparCart();
    return;
  }
  if (e.target && e.target.id === 'btnCheckout') {
  const cart = getCart();

  if (!cart || cart.length === 0) {
    const mensaje = document.getElementById('mensajeCarritoVacio');
    mensaje.classList.remove('d-none');

    setTimeout(() => {
      mensaje.classList.add('d-none');
    }, 3000);
    return;
  }

  const total = cart.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.qty) || 0), 0);
  document.getElementById('confirmTotal').textContent = `$${total.toFixed(2)}`;

  const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
  confirmModal.show();
  return;
  }

});

document.getElementById('btnConfirmPurchase')?.addEventListener('click', () => {
  limparCart();
  renderCart();

  const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
  confirmModal.hide();

  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();
});



