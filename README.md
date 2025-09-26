# Eccomer-Laboratory

Aplicación web simple de e‑commerce (laboratorio) construida con HTML, JavaScript y Bootstrap. Consume la Fake Store API para listar productos, permite buscarlos, ver su detalle en un modal y gestionar un carrito persistido en `localStorage` con un panel lateral (offcanvas).

## 🧭 Descripción

- Lista productos desde `https://fakestoreapi.com/products`.
- Búsqueda instantánea por título, usando datos cacheados en `localStorage` para evitar llamadas repetidas.
- Modal de detalle con imagen, descripción y precio.
- Carrito persistente en `localStorage`: agregar, incrementar, decrementar, eliminar y limpiar.
- Cálculo de total y badge dinámico en el ícono del carrito.
- Flujo de “checkout” con modal de confirmación y mensaje de éxito.

## 🚀 Cómo ejecutar

- Requisitos: navegador moderno y conexión a Internet (para acceder a la API pública).
- Opción rápida: abrir `index.html` directamente en el navegador.
- Recomendado: servir como sitio estático (por ejemplo, con cualquier servidor local) para un comportamiento más cercano a producción.

## 🗂️ Estructura del proyecto

- `index.html` — Maquetado principal, incluye los modales y el offcanvas del carrito.
- `assets/` — Recursos estáticos (imágenes, etc.).
- `src/index.js` — Punto de entrada. Inicializa la lista, la búsqueda y orquesta los eventos del carrito y modales.
- `src/api.js` — Funciones para: listar productos, obtener detalle y búsqueda local (sobre cache en `localStorage`).
- `src/localStorage.js` — Abstracción del carrito en `localStorage` (agregar, incrementar, restar, borrar, limpiar y obtención del carrito).
- `src/componente/cardProducto.js` — Render de cards de productos y manejo del botón “Ver detalle”.
- `src/componente/cardCarrito.js` — Render de cada item del carrito (con botones +/− y eliminar).
- `.github/workflows/` — Workflows de GitHub Actions (protecciones del repo, etc.).

## 🔁 Flujo principal

1. Al cargar, `src/index.js` llama a `fetchData()` (en `src/api.js`) y renderiza la grilla con `cardProductoList()`.
2. El buscador (input `type="search"`) filtra por título usando `SearchProduct()` con datos guardados previamente en `localStorage`.
3. “Ver detalle” abre un modal con datos de `fetchDataDetallado(id)` y permite agregar al carrito.
4. El carrito se renderiza en el offcanvas con `cardCarrito()`. Acciones disponibles: sumar, restar (mínimo 1), eliminar y limpiar.
5. “Finalizar compra” muestra un modal de confirmación; al confirmar se limpia el carrito y se muestra un modal de éxito.

## 🧩 Tecnologías utilizadas

- HTML5, CSS (Bootstrap 5, Bootstrap Icons, Font Awesome)
- JavaScript (ES Modules)
- Fake Store API (datos de ejemplo)
- `localStorage` para persistencia del carrito

## ✅ Decisiones y consideraciones

- El listado cachea la respuesta inicial en `localStorage` para mejorar la experiencia al buscar.
- Se evita registrar múltiples listeners en el botón del modal con `{ once: true }` al agregar al carrito.
- Los cálculos de totales controlan `Number(...)` para evitar NaN si el dato viniera como string.
- El decremento deshabilita el botón cuando `qty <= 1` para no bajar de 1.

## 📦 Endpoints y datos

- Listado: `GET https://fakestoreapi.com/products`
- Detalle: `GET https://fakestoreapi.com/products/:id`

La API es pública y permite CORS. Requiere conexión a Internet.

## 🧪 Cómo probar rápidamente

- Buscar: escribí en el buscador para filtrar en tiempo real por título.
- Detalle: hacé clic en “Ver detalle” en cualquier producto.
- Carrito: desde el modal, agregá el producto y abrí el carrito (ícono superior). Probá +/−, eliminar y limpiar.
- Checkout: presioná “Finalizar compra” y confirmá para ver el flujo completo.

## 👥 Participantes del TP

| Integrante              | GitHub                          |
| ----------------------- | ------------------------------- |
| Luis Ortega             | https://github.com/Ortega-Luis  |
| Yenifer Magali Neubauer | https://github.com/yeni-neu     |
| Juan Agustin Alejandro  | https://github.com/JuanAgusAlej |

## 🗺️ Roadmap (ideas futuras)

- Paginación del listado y filtros por categoría.
- Toasts no intrusivos para feedback del carrito.
- Validaciones y estados de carga (skeletons/spinners).
- Tests unitarios de utilidades (`localStorage.js`).

## 🙌 Créditos

- Datos: Fake Store API (https://fakestoreapi.com/)
- UI: Bootstrap, Bootstrap Icons y Font Awesome
