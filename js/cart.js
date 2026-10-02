/* ============================================================
   CART.JS — Carrito de compras con localStorage
   ============================================================ */

const Cart = {
  KEY: 'verduleria_cart',
  COUPON_KEY: 'verduleria_coupon',

  _read() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  _write(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  getItems() { return this._read(); },

  getCount() {
    return this._read().reduce((sum, item) => sum + item.qty, 0);
  },

  getSubtotal() {
    return this._read().reduce((sum, item) => sum + (item.precio * item.qty), 0);
  },

  add(productId, qty = 1) {
    const producto = PRODUCTOS.find(p => p.id === Number(productId));
    if (!producto) { Toast.error('Producto no encontrado'); return; }
    const items = this._read();
    const existing = items.find(i => i.id === producto.id);
    if (existing) existing.qty += qty;
    else items.push({ id: producto.id, qty, precio: producto.precio, nombre: producto.nombre, imagen: producto.imagen });
    this._write(items);
    Toast.success(`"${producto.nombre}" agregado al carrito`);
  },

  update(productId, qty) {
    const items = this._read();
    const item = items.find(i => i.id === Number(productId));
    if (!item) return;
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    item.qty = qty;
    this._write(items);
  },

  remove(productId) {
    const items = this._read().filter(i => i.id !== Number(productId));
    this._write(items);
    Toast.info('Producto eliminado del carrito');
  },

  clear() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.COUPON_KEY);
    this.updateBadge();
  },

  /* Cupón */
  applyCoupon(code) {
    const upper = String(code || '').trim().toUpperCase();
    const coupon = CUPONES[upper];
    if (!coupon) { Toast.error('Cupón inválido'); return null; }
    localStorage.setItem(this.COUPON_KEY, upper);
    Toast.success(`Cupón aplicado: ${coupon.descripcion}`);
    return coupon;
  },
  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    Toast.info('Cupón eliminado');
  },
  getCoupon() {
    const code = localStorage.getItem(this.COUPON_KEY);
    return code ? { code, ...CUPONES[code] } : null;
  },

  /* Helpers agregados */
  getDiscount() {
    const coupon = this.getCoupon();
    return coupon ? Math.round(this.getSubtotal() * coupon.descuento) : 0;
  },

  getShipping(method = 'standard') {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return Utils.calcShipping(subtotal, method);
  },

  getTotal(method = 'standard') {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const discount = this.getDiscount();
    const shipping = this.getShipping(method);
    let total = subtotal - discount + shipping;
    if (method === 'cash') total = Math.round(total * 0.9); // 10% descuento efectivo
    return Math.max(total, 0);
  },

  /* Badge navbar */
  updateBadge() {
    const badges = document.querySelectorAll('[data-cart-badge]');
    const count = this.getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });
  }
};