/* ============================================================
   DETALLE.JS — Página de detalle de producto
   ============================================================ */

(function() {
  let producto = null;
  let qty = 1;
  let activeTab = 'descripcion';
  let ratingSeleccionado = 0;

  function render() {
    if (!producto) return;
    document.title = `${producto.nombre} · La Verdu`;
    const hasDiscount = producto.precioAnterior && producto.precioAnterior > producto.precio;
    const descuento = hasDiscount ? Math.round((1 - producto.precio / producto.precioAnterior) * 100) : 0;
    const avg = Reviews.average(producto.id);
    const count = Reviews.count(producto.id);
    const categoria = CATEGORIAS.find(c => c.id === producto.categoria);

    const main = document.getElementById('detalleMain');
    main.innerHTML = `
      <nav class="text-sm text-slate-500 mb-4">
        <a href="index.html" class="hover:text-primary-600">Inicio</a> /
        <a href="productos.html" class="hover:text-primary-600">Productos</a> /
        <a href="productos.html?cat=${producto.categoria}" class="hover:text-primary-600">${categoria?.nombre || ''}</a> /
        <span class="text-slate-700">${producto.nombre}</span>
      </nav>
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-3 relative">
            <img id="mainImage" src="${productImg(producto, '800x800')}" alt="${Utils.escape(producto.nombre)}"
                 class="w-full h-full object-cover"
                 onerror="this.onerror=null;this.src='assets/fallback.svg'">
            ${hasDiscount ? `<span class="badge bg-red-500 text-white absolute top-3 left-3 text-sm">-${descuento}%</span>` : ''}
            ${producto.organico ? `<span class="badge bg-emerald-600 text-white absolute top-3 right-3 text-sm">🌱 Orgánico</span>` : ''}
          </div>
          <div class="grid grid-cols-4 gap-2">
            ${[1, 2, 3, 4].map(i => `
              <button class="aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-transparent hover:border-primary-500 transition thumb-btn" data-thumb="${i}">
                <img src="${productImg(producto, '200x200')}" alt="" class="w-full h-full object-cover"
                     onerror="this.onerror=null;this.src='assets/fallback.svg'">
              </button>
            `).join('')}
          </div>
        </div>
        <div>
          <span class="badge bg-primary-100 text-primary-700">${categoria?.icono || ''} ${categoria?.nombre || producto.categoria}</span>
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">${producto.nombre}</h1>
          <div class="flex items-center gap-2 mt-3">
            ${Utils.stars(avg)}
            <span class="text-sm text-slate-500">${avg.toFixed(1)} (${count} reseñas)</span>
          </div>
          <div class="flex items-baseline gap-3 mt-5">
            ${hasDiscount ? `<span class="text-lg text-slate-400 line-through">${Utils.formatPrice(producto.precioAnterior)}</span>` : ''}
            <span class="text-4xl font-extrabold text-primary-600">${Utils.formatPrice(producto.precio)}</span>
          </div>
          <p class="mt-5 text-slate-600 leading-relaxed">${producto.descripcion}</p>
          <div class="mt-3 text-sm ${producto.stock > 0 ? 'text-emerald-700' : 'text-red-600'}">
            ${producto.stock > 0 ? `✓ Stock disponible (${producto.stock} unidades)` : '✗ Sin stock'}
          </div>

          <div class="mt-6 flex items-center gap-3">
            <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button class="qty-btn px-3 py-2 hover:bg-slate-100" data-step="-1">−</button>
              <input id="qtyInput" type="number" min="1" max="${producto.stock}" value="${qty}" class="w-16 text-center border-x border-slate-200 py-2 focus:outline-none">
              <button class="qty-btn px-3 py-2 hover:bg-slate-100" data-step="1">+</button>
            </div>
            <button id="addCartBtn" ${producto.stock === 0 ? 'disabled' : ''} class="btn-primary flex-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l-2 6"/></svg>
              Agregar al carrito
            </button>
          </div>
          <div class="mt-4 flex gap-2">
            <button id="reviewBtn" class="btn-secondary flex-1">⭐ Escribir reseña</button>
          </div>
          <div class="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-600">
            <div class="bg-slate-50 rounded-lg p-3">🚚 Envío rápido</div>
            <div class="bg-slate-50 rounded-lg p-3">🌱 100% fresco</div>
            <div class="bg-slate-50 rounded-lg p-3">💚 Calidad garantizada</div>
          </div>
        </div>
      </div>
    `;

    initListeners();

    /* Tabs */
    renderTabs();
    renderRelacionados();
  }

  function initListeners() {
    document.querySelectorAll('.qty-btn').forEach(b => {
      b.addEventListener('click', () => {
        const step = Number(b.dataset.step);
        const newQty = qty + step;
        if (newQty < 1 || newQty > producto.stock) return;
        qty = newQty;
        document.getElementById('qtyInput').value = qty;
      });
    });

    const qtyInput = document.getElementById('qtyInput');
    qtyInput.addEventListener('change', () => {
      let v = Number(qtyInput.value) || 1;
      v = Math.max(1, Math.min(producto.stock, v));
      qty = v;
      qtyInput.value = qty;
    });

    document.getElementById('addCartBtn').addEventListener('click', () => {
      Cart.add(producto.id, qty);
    });

    document.getElementById('reviewBtn').addEventListener('click', () => {
      const user = Auth.currentUser();
      if (!user) {
        Toast.info('Iniciá sesión para escribir una reseña');
        setTimeout(() => {
          window.location.href = `login.html?return=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        }, 800);
        return;
      }
      window.location.href = `resena.html?producto=${producto.id}`;
    });

    document.querySelectorAll('.thumb-btn').forEach(b => b.addEventListener('click', () => {
      Toast.info('Vista adicional #' + b.dataset.thumb);
    }));
  }

  function renderTabs() {
    const root = document.getElementById('tabs');
    root.innerHTML = `
      <div class="border-b border-slate-200 flex gap-1 overflow-x-auto">
        <button data-tab="descripcion" class="tab-btn px-4 py-3 font-semibold border-b-2 ${activeTab === 'descripcion' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-800'}">Descripción</button>
        <button data-tab="nutricion"    class="tab-btn px-4 py-3 font-semibold border-b-2 ${activeTab === 'nutricion'    ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-800'}">Info nutricional</button>
        <button data-tab="resenas"      class="tab-btn px-4 py-3 font-semibold border-b-2 ${activeTab === 'resenas'      ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-800'}">Reseñas (${Reviews.count(producto.id)})</button>
      </div>
      <div class="py-6">
        ${activeTab === 'descripcion' ? `<p class="text-slate-700 leading-relaxed">${producto.descripcion}</p>
          ${producto.organico ? `<div class="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">🌱 <strong>Producto orgánico certificado.</strong> Cultivado sin agroquímicos respetando el medio ambiente.</div>` : ''}` : ''}
        ${activeTab === 'nutricion' ? `<div class="bg-slate-50 rounded-lg p-5 text-slate-700">${producto.infoNutricional}</div>` : ''}
        ${activeTab === 'resenas' ? renderResenas() : ''}
      </div>
    `;
    root.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => {
      activeTab = b.dataset.tab;
      renderTabs();
    }));
  }

  function renderResenas() {
    const list = Reviews.byProduct(producto.id);
    if (list.length === 0) return `<div class="text-center py-8 text-slate-500"><div class="text-5xl mb-2">⭐</div>Este producto aún no tiene reseñas. ¡Sé el primero en opinar!</div>`;
    return `
      <div class="space-y-4">
        ${list.map(r => `
          <div class="border-b border-slate-100 pb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">${Utils.escape(r.userName.charAt(0).toUpperCase())}</div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm">${Utils.escape(r.userName)}</p>
                  <p class="text-xs text-slate-500">${Utils.formatDate(r.fecha)}</p>
                </div>
              </div>
              ${Utils.stars(r.rating)}
            </div>
            <h4 class="font-semibold text-slate-800 mt-2">${Utils.escape(r.titulo)}</h4>
            <p class="text-slate-600 text-sm mt-1">${Utils.escape(r.comentario)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRelacionados() {
    const root = document.getElementById('relacionados');
    const list = PRODUCTOS.filter(p => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 4);
    if (list.length === 0) return;
    root.innerHTML = `
      <div class="border-t border-slate-200 mt-12 pt-8">
        <h3 class="text-2xl font-extrabold text-slate-900 mb-6">Productos relacionados</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${list.map(p => `
            <a href="producto-detalle.html?id=${p.id}" class="card group hover:shadow-lg transition">
              <div class="aspect-square overflow-hidden bg-slate-100">
                <img src="${productImg(p)}" alt="${Utils.escape(p.nombre)}" loading="lazy"
                     class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                     onerror="this.onerror=null;this.src='assets/fallback.svg'">
              </div>
              <div class="p-3">
                <h4 class="font-semibold text-slate-800 text-sm line-clamp-2">${p.nombre}</h4>
                <p class="text-primary-600 font-bold mt-1">${Utils.formatPrice(p.precio)}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function init() {
    Layout.render();
    const id = Utils.getQueryParam('id');
    producto = PRODUCTOS.find(p => p.id === Number(id));
    if (!producto) {
      document.getElementById('detalleMain').innerHTML = '<div class="text-center py-20"><div class="text-6xl mb-3">😕</div><h2 class="font-bold text-slate-800 mb-2">Producto no encontrado</h2><a href="productos.html" class="btn-primary">Ir a productos</a></div>';
      document.getElementById('tabs').innerHTML = '';
      return;
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();