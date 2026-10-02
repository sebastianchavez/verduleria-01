/* ============================================================
   PERFIL.JS — Mi perfil + historial de pedidos
   ============================================================ */

(function() {
  let activeTab = 'pedidos';

  function render() {
    const user = Auth.currentUser();
    if (!user) return; // requireAuth ya redirige

    // Header del perfil
    const header = document.getElementById('profileHeader');
    header.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-extrabold text-2xl">
          ${user.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-800">${Utils.escape(user.nombre)} ${Utils.escape(user.apellido || '')}</h2>
          <p class="text-slate-600">${Utils.escape(user.email)}</p>
        </div>
      </div>
    `;

    // Datos personales
    const datos = document.getElementById('datosPersonales');
    datos.innerHTML = `
      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div><span class="text-slate-500">Nombre:</span> <strong>${Utils.escape(user.nombre)} ${Utils.escape(user.apellido || '')}</strong></div>
        <div><span class="text-slate-500">Email:</span> <strong>${Utils.escape(user.email)}</strong></div>
        <div><span class="text-slate-500">Teléfono:</span> <strong>${Utils.escape(user.telefono || '-')}</strong></div>
        <div><span class="text-slate-500">Miembro desde:</span> <strong>${Utils.formatDate(user.createdAt)}</strong></div>
      </div>
      <button class="btn-secondary mt-4" onclick="document.getElementById('logoutBtn').click()">Cerrar sesión</button>
    `;

    renderPedidos();
    renderResenas();
    activateTab(activeTab);
  }

  function renderPedidos() {
    const user = Auth.currentUser();
    const orders = Orders.byUser(user.id);
    const root = document.getElementById('pedidosList');

    if (orders.length === 0) {
      root.innerHTML = `
        <div class="text-center py-12">
          <div class="text-5xl mb-3">📦</div>
          <h3 class="font-bold text-slate-800 mb-1">Aún no tenés pedidos</h3>
          <p class="text-slate-600 mb-4">¡Hacé tu primera compra!</p>
          <a href="productos.html" class="btn-primary">Ver productos</a>
        </div>
      `;
      return;
    }

    root.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th class="text-left px-3 py-3">Pedido</th>
              <th class="text-left px-3 py-3">Fecha</th>
              <th class="text-center px-3 py-3">Items</th>
              <th class="text-right px-3 py-3">Total</th>
              <th class="text-center px-3 py-3">Estado</th>
              <th class="text-right px-3 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${orders.map(o => {
              const estadoColor = { 'Confirmado':'bg-emerald-100 text-emerald-700', 'En preparación':'bg-amber-100 text-amber-700', 'Enviado':'bg-blue-100 text-blue-700', 'Entregado':'bg-slate-100 text-slate-700', 'Cancelado':'bg-red-100 text-red-700' }[o.estado] || 'bg-slate-100 text-slate-700';
              return `
                <tr class="hover:bg-slate-50">
                  <td class="px-3 py-3 font-semibold text-slate-800">${o.id}</td>
                  <td class="px-3 py-3 text-slate-600 text-sm">${Utils.formatDate(o.fecha)}</td>
                  <td class="px-3 py-3 text-center text-slate-600">${o.items.length}</td>
                  <td class="px-3 py-3 text-right font-bold text-primary-600">${Utils.formatPrice(o.total)}</td>
                  <td class="px-3 py-3 text-center"><span class="badge ${estadoColor}">${o.estado}</span></td>
                  <td class="px-3 py-3 text-right">
                    <a href="pedido-detalle.html?id=${o.id}" class="text-primary-600 hover:underline text-sm font-semibold">Ver detalle →</a>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderResenas() {
    const user = Auth.currentUser();
    const reviews = Reviews.byUser(user.id);
    const root = document.getElementById('resenasList');

    if (reviews.length === 0) {
      root.innerHTML = `
        <div class="text-center py-12">
          <div class="text-5xl mb-3">⭐</div>
          <h3 class="font-bold text-slate-800 mb-1">Aún no escribiste reseñas</h3>
          <p class="text-slate-600 mb-4">Comprá un producto y dejá tu opinión</p>
          <a href="productos.html" class="btn-primary">Ver productos</a>
        </div>
      `;
      return;
    }

    root.innerHTML = reviews.map(r => {
      const p = PRODUCTOS.find(x => x.id === r.productId);
      return `
        <div class="border-b border-slate-100 pb-4 flex items-start justify-between gap-4">
          <div class="flex-1">
            <a href="producto-detalle.html?id=${r.productId}" class="font-semibold text-slate-800 hover:text-primary-600">${p ? Utils.escape(p.nombre) : 'Producto'}</a>
            <div class="mt-1">${Utils.stars(r.rating)}</div>
            <h4 class="font-semibold text-slate-800 mt-2">${Utils.escape(r.titulo)}</h4>
            <p class="text-slate-600 text-sm mt-1">${Utils.escape(r.comentario)}</p>
            <p class="text-xs text-slate-400 mt-2">${Utils.formatDate(r.fecha)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  function activateTab(name) {
    activeTab = name;
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.classList.toggle('border-primary-600', el.dataset.tab === name);
      el.classList.toggle('text-primary-700',   el.dataset.tab === name);
      el.classList.toggle('border-transparent', el.dataset.tab !== name);
      el.classList.toggle('text-slate-500',     el.dataset.tab !== name);
    });
    ['pedidos', 'datos', 'resenas'].forEach(t => {
      document.getElementById('panel-' + t).classList.toggle('hidden', t !== name);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const user = Utils.requireAuth();
    if (!user) return;
    Layout.render();
    render();

    document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => activateTab(el.dataset.tab)));
  });
})();