import { fetchData, fetchDataDetallado } from "./api.js";
import { cardProductoList } from "./componente/cardProducto.js";

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
