/* ============================================================
   UTILS.JS — Helpers comunes
   ============================================================ */

const Utils = {
  formatPrice(amount) {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
  },

  getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  setQueryParam(key, value) {
    const params = new URLSearchParams(window.location.search);
    if (value === null || value === undefined || value === '') params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    const url = window.location.pathname + (qs ? '?' + qs : '');
    window.history.replaceState({}, '', url);
  },

  debounce(fn, wait = 300) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  },

  formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },

  formatDateTime(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    return d.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  escape(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  slugify(str) {
    return String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  },

  calcShipping(subtotal, method) {
    if (method === 'express') return 2500;
    if (method === 'retiro')   return 0;
    return subtotal >= 5000 ? 0 : 1500;
  },

  stars(rating, max = 5) {
    const full = Math.round(rating);
    let html = '<span class="star-display inline-flex gap-0.5">';
    for (let i = 1; i <= max; i++) html += `<span class="star ${i <= full ? 'active' : ''}">★</span>`;
    html += '</span>';
    return html;
  },

  requireAuth(redirect = true) {
    const user = Auth.currentUser();
    if (!user && redirect) {
      window.location.href = `login.html?return=${encodeURIComponent(window.location.pathname + window.location.search)}`;
      return null;
    }
    return user;
  },

  /* Smooth redirect with delay (allows toast) */
  redirect(url, delay = 800) {
    if (delay > 0) setTimeout(() => { window.location.href = url; }, delay);
    else window.location.href = url;
  }
};

/* ============================================================
   TOAST.JS — Sistema de notificaciones globales
   ============================================================ */

const Toast = {
  show(message, type = 'info', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity .3s';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  success(message) { this.show(message, 'success'); },
  error(message)   { this.show(message, 'error'); },
  info(message)    { this.show(message, 'info'); }
};