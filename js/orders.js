/* ============================================================
   ORDERS.JS — Gestión de pedidos con localStorage
   ============================================================ */

const Orders = {
  KEY: 'verduleria_orders',

  _read() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  _write(orders) { localStorage.setItem(this.KEY, JSON.stringify(orders)); },

  getAll() { return this._read(); },

  byId(id) {
    return this._read().find(o => o.id === id);
  },

  byUser(userId) {
    return this._read().filter(o => o.userId === userId).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  },

  create({ userId, userName, items, subtotal, descuento, envio, total, direccionEnvio, envioTipo, pagoMetodo, pagoDetalle }) {
    const order = {
      id: 'VER-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase(),
      userId: userId || null,
      userName: userName || 'Invitado',
      items,
      subtotal,
      descuento: descuento || 0,
      envio: envio || 0,
      total,
      direccionEnvio,
      envioTipo,
      pagoMetodo,
      pagoDetalle: pagoDetalle || {},
      fecha: new Date().toISOString(),
      estado: 'Confirmado',
      estadoTimeline: [
        { estado: 'Pendiente',  fecha: new Date().toISOString() },
        { estado: 'Confirmado', fecha: new Date().toISOString() }
      ]
    };
    const orders = this._read();
    orders.unshift(order);
    this._write(orders);
    return order;
  },

  cancelar(id) {
    const orders = this._read();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return false;
    orders[idx].estado = 'Cancelado';
    orders[idx].estadoTimeline.push({ estado: 'Cancelado', fecha: new Date().toISOString() });
    this._write(orders);
    return true;
  },

  avanzar(id, nuevoEstado) {
    const orders = this._read();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return false;
    orders[idx].estado = nuevoEstado;
    orders[idx].estadoTimeline.push({ estado: nuevoEstado, fecha: new Date().toISOString() });
    this._write(orders);
    return true;
  }
};