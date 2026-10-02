/* ============================================================
   LANDING.JS — Página de inicio
   ============================================================ */

(function() {
  const featured = PRODUCTOS.filter(p => p.destacado).slice(0, 8);

  /* Render categorías */
  function renderCategorias() {
    const root = document.getElementById('categoriasGrid');
    if (!root) return;
    root.innerHTML = CATEGORIAS.map(c => `
      <a href="productos.html?cat=${c.id}" class="card group hover:shadow-md transition p-6 flex flex-col items-center text-center hover:-translate-y-1 duration-200">
        <div class="text-5xl mb-3 group-hover:scale-110 transition">${c.icono}</div>
        <h3 class="font-bold text-slate-800 mb-1">${c.nombre}</h3>
        <p class="text-sm text-slate-500">${c.descripcion}</p>
      </a>
    `).join('');
  }

  /* Render productos destacados */
  function renderFeatured() {
    const root = document.getElementById('featuredGrid');
    if (!root) return;
    root.innerHTML = featured.map(p => productCardHTML(p)).join('');
  }

  function productCardHTML(p) {
    const hasDiscount = p.precioAnterior && p.precioAnterior > p.precio;
    const descuento = hasDiscount ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;
    const avg = Reviews.average(p.id);
    const count = Reviews.count(p.id);
    return `
      <a href="producto-detalle.html?id=${p.id}" class="card group hover:shadow-lg transition flex flex-col">
        <div class="relative aspect-square overflow-hidden bg-slate-100">
          <img src="${productImg(p)}" alt="${Utils.escape(p.nombre)}" loading="lazy"
               class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
               onerror="this.onerror=null;this.src='assets/fallback.svg'">
          ${hasDiscount ? `<span class="badge bg-red-500 text-white absolute top-2 left-2">-${descuento}%</span>` : ''}
          ${p.organico ? `<span class="badge bg-emerald-600 text-white absolute top-2 right-2">Orgánico</span>` : ''}
        </div>
        <div class="p-4 flex flex-col flex-1">
          <span class="text-xs text-slate-500 uppercase tracking-wide">${CATEGORIAS.find(c => c.id === p.categoria)?.nombre || p.categoria}</span>
          <h3 class="font-semibold text-slate-800 mt-1 line-clamp-2">${p.nombre}</h3>
          <div class="flex items-center gap-1 mt-2 text-sm text-slate-500">
            ${Utils.stars(avg)}
            <span class="ml-1">${count > 0 ? `(${count})` : 'Nuevo'}</span>
          </div>
          <div class="flex items-end justify-between mt-3">
            <div>
              ${hasDiscount ? `<span class="text-xs text-slate-400 line-through mr-1">${Utils.formatPrice(p.precioAnterior)}</span>` : ''}
              <span class="text-lg font-bold text-primary-600">${Utils.formatPrice(p.precio)}</span>
            </div>
            <button class="btn-primary text-xs px-3 py-1.5" onclick="event.preventDefault();event.stopPropagation();Cart.add(${p.id},1)">+ Agregar</button>
          </div>
        </div>
      </a>
    `;
  }

  /* Newsletter */
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type=email]').value;
      if (!email) return;
      Toast.success('¡Gracias por suscribirte! Te enviaremos novedades.');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    renderCategorias();
    renderFeatured();
    initNewsletter();
  });
})();