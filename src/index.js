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

document.addEventListener("DOMContentLoaded", () => {
  listaDeProductos();
  productoDetallado(1);
});
