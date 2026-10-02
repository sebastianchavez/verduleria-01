/* ============================================================
   RESENA.JS — Formulario de reseña con estrellas
   ============================================================ */

(function() {
  let rating = 0;
  let hoverRating = 0;

  function renderStars() {
    const root = document.getElementById('stars');
    root.innerHTML = [1, 2, 3, 4, 5].map(i => `
      <span class="star ${i <= (hoverRating || rating) ? 'active' : ''}" data-val="${i}">★</span>
    `).join('');

    const label = document.getElementById('ratingLabel');
    const labels = { 1: 'Muy malo', 2: 'Malo', 3: 'Regular', 4: 'Bueno', 5: 'Excelente' };
    label.textContent = (hoverRating || rating) ? labels[hoverRating || rating] : 'Toca una estrella para calificar';
  }

  function init() {
    const user = Auth.currentUser();
    if (!user) return;

    // Pre-rellenar producto si viene en query
    const productoId = Utils.getQueryParam('producto');
    const selectProd = document.getElementById('productoSelect');

    const ordenes = Orders.byUser(user.id);
    const productosComprados = new Set();
    ordenes.forEach(o => o.items.forEach(i => productosComprados.add(i.id)));

    if (productosComprados.size === 0) {
      // Permitir reseñar cualquiera (modo demo)
      PRODUCTOS.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre;
        selectProd.appendChild(opt);
      });
    } else {
      PRODUCTOS.filter(p => productosComprados.has(p.id)).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre;
        selectProd.appendChild(opt);
      });
      // Permitir todos también
      const allOpt = document.createElement('optgroup');
      allOpt.label = 'Todos los productos';
      PRODUCTOS.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre;
        allOpt.appendChild(opt);
      });
      selectProd.appendChild(allOpt);
    }

    if (productoId) selectProd.value = productoId;

    // Estrellas
    const starsRoot = document.getElementById('stars');
    starsRoot.addEventListener('mouseover', (e) => {
      const s = e.target.closest('.star');
      if (!s) return;
      hoverRating = Number(s.dataset.val);
      renderStars();
    });
    starsRoot.addEventListener('mouseout', () => {
      hoverRating = 0;
      renderStars();
    });
    starsRoot.addEventListener('click', (e) => {
      const s = e.target.closest('.star');
      if (!s) return;
      rating = Number(s.dataset.val);
      renderStars();
    });

    renderStars();

    // Form
    const form = document.getElementById('resenaForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (rating === 0) {
        Toast.error('Seleccioná una calificación con estrellas');
        return;
      }
      try {
        Reviews.add({
          productId: data.get('producto'),
          userId: user.id,
          userName: user.nombre,
          rating,
          titulo: data.get('titulo'),
          comentario: data.get('comentario')
        });
        Toast.success('¡Gracias por tu reseña!');
        setTimeout(() => window.location.href = 'perfil.html', 800);
      } catch (err) {
        Toast.error(err.message);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const user = Utils.requireAuth();
    if (!user) return;
    Layout.render();
    init();
  });
})();