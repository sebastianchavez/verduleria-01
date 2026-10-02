/* ============================================================
   REVIEWS.JS — Gestión de reseñas con localStorage
   ============================================================ */

const Reviews = {
  KEY: 'verduleria_reviews',

  _read() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  _write(reviews) { localStorage.setItem(this.KEY, JSON.stringify(reviews)); },

  getAll() { return this._read(); },

  byProduct(productId) {
    return this._read().filter(r => Number(r.productId) === Number(productId));
  },

  byUser(userId) {
    return this._read().filter(r => r.userId === userId);
  },

  average(productId) {
    const list = this.byProduct(productId);
    if (list.length === 0) return 0;
    const total = list.reduce((sum, r) => sum + Number(r.rating), 0);
    return Math.round((total / list.length) * 10) / 10;
  },

  count(productId) {
    return this.byProduct(productId).length;
  },

  add({ productId, userId, userName, rating, titulo, comentario }) {
    if (!userId) throw new Error('Debes iniciar sesión para dejar una reseña');
    const r = Number(rating);
    if (!r || r < 1 || r > 5) throw new Error('La calificación debe estar entre 1 y 5');
    if (!titulo || !comentario) throw new Error('Completá todos los campos');
    const reviews = this._read();
    const existing = reviews.find(x => x.productId === Number(productId) && x.userId === userId);
    if (existing) throw new Error('Ya dejaste una reseña para este producto');
    const review = {
      id: Utils.generateId(),
      productId: Number(productId),
      userId,
      userName: userName || 'Anónimo',
      rating: r,
      titulo: titulo.trim(),
      comentario: comentario.trim(),
      fecha: new Date().toISOString()
    };
    reviews.unshift(review);
    this._write(reviews);
    return review;
  },

  remove(id) {
    const reviews = this._read().filter(r => r.id !== id);
    this._write(reviews);
  }
};