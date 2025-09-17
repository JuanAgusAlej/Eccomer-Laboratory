const STORAGE_KEY = 'cart';

const getCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const guardarCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
};

const agregarItem = (item) => {
  const cart = getCart();
  const existing = cart.find(p => p.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  guardarCart(cart);
};

const incrementarItem = (id) => {
  const cart = getCart();
  const p = cart.find(x => x.id === id);
  if (p) p.qty += 1;
  guardarCart(cart);
};

const restarItem = (id) => {
  const cart = getCart();
  const p = cart.find(x => x.id === id);
  if (p && p.qty > 1) p.qty -= 1;
  guardarCart(cart);
};

const borrarItem = (id) => {
  const cart = getCart().filter(x => x.id !== id);
  guardarCart(cart);
};

const limparCart = () => guardarCart([]);

export { getCart, guardarCart, agregarItem, incrementarItem, restarItem, borrarItem, limparCart };