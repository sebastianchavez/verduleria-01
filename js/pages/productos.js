/* ============================================================
   PRODUCTOS.JS — Catálogo con filtros, búsqueda y sort
   ============================================================ */

(function() {
  const state = {
    categoria: null,
    organico: false,
    precioMin: 0,
    precioMax: 10000,
    search: '',
    sort: 'nombre-asc',
    page: 1,
    perPage: 12
  };

  function getFiltered() {
    let items = PRODUCTOS.slice();

    if (state.search) {
      const q = state.search.toLowerCase();
      items = items.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
    }
    if (state.categoria) items = items.filter(p => p.categoria === state.categoria);
    if (state.organico) items = items.filter(p => p.organico);
    items = items.filter(p => p.precio >= state.precioMin && p.precio <= state.precioMax);

    switch (state.sort) {
      case 'precio-asc':  items.sort((a, b) => a.precio - b.precio); break;
      case 'precio-desc': items.sort((a, b) => b.precio - a.precio); break;
      case 'rating':      items.sort((a, b) => Reviews.average(b.id) - Reviews.average(a.id)); break;
      case 'nombre-asc':
      default: items.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    return items;
  }

  function productCard(p) {
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

  function renderCategoriasFiltro() {
    const root = document.getElementById('catFiltro');
    if (!root) return;
    root.innerHTML = CATEGORIAS.map(c => `
      <label class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg">
        <input type="radio" name="cat" value="${c.id}" ${state.categoria === c.id ? 'checked' : ''} class="text-primary-600 focus:ring-primary-500">
        <span class="text-sm">${c.icono} ${c.nombre}</span>
      </label>
    `).join('') + `
      <label class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg border-t border-slate-200 mt-2 pt-3">
        <input type="radio" name="cat" value="" ${!state.categoria ? 'checked' : ''} class="text-primary-600 focus:ring-primary-500">
        <span class="text-sm">Todas</span>
      </label>
    `;
    root.querySelectorAll('input[name=cat]').forEach(r => r.addEventListener('change', (e) => {
      state.categoria = e.target.value || null;
      Utils.setQueryParam('cat', state.categoria);
      state.page = 1;
      render();
    }));
  }

  function renderListado() {
    const root = document.getElementById('productosGrid');
    const empty = document.getElementById('emptyState');
    const pagination = document.getElementById('pagination');
    const count = document.getElementById('resultCount');

    const filtered = getFiltered();
    count.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      root.innerHTML = '';
      empty.classList.remove('hidden');
      pagination.innerHTML = '';
      return;
    }
    empty.classList.add('hidden');

    const totalPages = Math.ceil(filtered.length / state.perPage);
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.perPage;
    const items = filtered.slice(start, start + state.perPage);
    root.innerHTML = items.map(productCard).join('');

    // Paginación
    if (totalPages > 1) {
      let html = '';
      html += `<button class="btn-secondary btn-sm" ${state.page === 1 ? 'disabled' : ''} data-page="${state.page - 1}">← Anterior</button>`;
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= state.page - 1 && i <= state.page + 1)) {
          html += `<button class="page-2 px-3 py-1.5 rounded-lg ${i === state.page ? 'bg-primary-600 text-white' : 'bg-white hover:bg-slate-50 border border-slate-200'} font-medium" data-page="${i}">${i}</button>`;
        } else if (i === state.page - 2 || i === state.page + 2) {
          html += `<span class="px-2 text-slate-400">…</span>`;
        }
      }
      html += `<button class="btn-secondary btn-sm" ${state.page === totalPages ? 'disabled' : ''} data-page="${state.page + 1}">Siguiente →</button>`;
      pagination.innerHTML = html;
      pagination.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => {
        const p = Number(b.dataset.page);
        if (p >= 1 && p <= totalPages) { state.page = p; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      }));
    } else {
      pagination.innerHTML = '';
    }
  }

  function render() { renderListado(); }

  function init() {
    Layout.render();

    // Leer query params
    state.categoria = Utils.getQueryParam('cat');
    state.search = Utils.getQueryParam('q') || '';

    renderCategoriasFiltro();

    // Search box
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = state.search;
      searchInput.addEventListener('input', Utils.debounce((e) => {
        state.search = e.target.value.trim();
        Utils.setQueryParam('q', state.search || null);
        state.page = 1;
        render();
      }, 250));
    }

    // Organico
    document.getElementById('organicoCheck').addEventListener('change', (e) => {
      state.organico = e.target.checked;
      state.page = 1;
      render();
    });

    // Precio
    const precioMax = document.getElementById('precioMax');
    const precioMaxLabel = document.getElementById('precioMaxLabel');
    precioMax.addEventListener('input', (e) => {
      state.precioMax = Number(e.target.value);
      precioMaxLabel.textContent = Utils.formatPrice(state.precioMax);
      render();
    });

    // Sort
    document.getElementById('sortSelect').addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();