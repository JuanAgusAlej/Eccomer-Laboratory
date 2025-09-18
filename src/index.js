import { fetchData, fetchDataDetallado } from "./api.js";
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
  productoDetallado(1);
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
    limparCart();
  }
});