/* ============================================================
   PEDIDO-DETALLE.JS — Detalle de un pedido + timeline
   ============================================================ */

(function() {
  function render() {
    const id = Utils.getQueryParam('id');
    const order = id ? Orders.byId(id) : null;
    const root = document.getElementById('pedidoContent');

    if (!order) {
      root.innerHTML = `
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🤔</div>
          <h2 class="text-xl font-bold text-slate-800 mb-2">Pedido no encontrado</h2>
          <a href="perfil.html" class="btn-primary">Ver mis pedidos</a>
        </div>
      `;
      return;
    }

    // Timeline de estados (puede ser custom según order.estadoTimeline)
    const allEstados = ['Pendiente', 'Confirmado', 'En preparación', 'Enviado', 'Entregado'];
    const estadoActualIdx = allEstados.indexOf(order.estado);
    const envioLabel = { standard: 'Standard · 3-5 días', express: 'Express · 24-48 hs', retiro: 'Retiro en tienda' }[order.envioTipo];
    const pagoLabel = { cash: 'Efectivo contra entrega', transfer: 'Transferencia bancaria', tarjeta: 'Tarjeta' }[order.pagoMetodo];

    root.innerHTML = `
      <nav class="text-sm text-slate-500 mb-4">
        <a href="perfil.html" class="hover:text-primary-600">Mi perfil</a> / <span class="text-slate-700">Pedido ${order.id}</span>
      </nav>

      <div class="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900">Pedido ${order.id}</h1>
          <p class="text-slate-600">Realizado el ${Utils.formatDateTime(order.fecha)}</p>
        </div>
        <span class="badge bg-emerald-100 text-emerald-700 text-base px-4 py-2">${order.estado}</span>
      </div>

      <!-- Timeline -->
      <div class="card p-6 mb-6">
        <h2 class="font-bold text-slate-800 mb-4">Estado del envío</h2>
        <div class="flex flex-col md:flex-row justify-between gap-2 relative">
          ${allEstados.map((e, i) => {
            const reached = i <= estadoActualIdx;
            const current = i === estadoActualIdx;
            const timelineEntry = (order.estadoTimeline || []).find(x => x.estado === e);
            return `
                <div class="flex md:flex-col items-center md:items-start gap-3 md:gap-2 flex-1">
                  <div class="flex items-center md:flex-col md:items-start">
                    <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold ${reached ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'} ${current ? 'ring-4 ring-primary-200' : ''}">
                      ${reached ? '✓' : i + 1}
                    </div>
                    ${i < allEstados.length - 1 ? `<div class="hidden md:block h-0.5 flex-1 mx-2 ${i < estadoActualIdx ? 'bg-primary-600' : 'bg-slate-200'}" style="min-width: 30px;"></div>` : ''}
                  </div>
                  <div>
                    <p class="font-semibold ${reached ? 'text-slate-800' : 'text-slate-400'} text-sm">${e}</p>
                    ${timelineEntry ? `<p class="text-xs text-slate-500">${Utils.formatDate(timelineEntry.fecha)}</p>` : ''}
                  </div>
                </div>
              `;
          }).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Items -->
        <div class="lg:col-span-2 card p-6">
          <h2 class="font-bold text-slate-800 mb-4">Productos (${order.items.length})</h2>
          <div class="space-y-3">
            ${order.items.map(item => `
              <div class="flex items-center gap-4 pb-3 border-b border-slate-100 last:border-0">
                <a href="producto-detalle.html?id=${item.id}" class="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src="${productImg({ imagen: item.imagen }, '150x150')}" alt="${Utils.escape(item.nombre)}" class="w-full h-full object-cover"
                       onerror="this.onerror=null;this.src='assets/fallback.svg'">
                </a>
                <div class="flex-1">
                  <a href="producto-detalle.html?id=${item.id}" class="font-semibold text-slate-800 hover:text-primary-600">${Utils.escape(item.nombre)}</a>
                  <p class="text-sm text-slate-500">${item.qty} x ${Utils.formatPrice(item.precio)}</p>
                </div>
                <div class="font-bold text-slate-800">${Utils.formatPrice(item.precio * item.qty)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Sidebar info -->
        <aside class="lg:col-span-1 space-y-4">
          <div class="card p-6">
            <h3 class="font-bold text-slate-800 mb-3">Envío</h3>
            <p class="text-sm text-slate-700 font-medium">${envioLabel}</p>
            <p class="text-sm text-slate-600 mt-2">${Utils.escape(order.direccionEnvio.calle)} ${Utils.escape(order.direccionEnvio.numero)}</p>
            <p class="text-sm text-slate-600">${order.direccionEnvio.piso ? 'Piso ' + Utils.escape(order.direccionEnvio.piso) + ' ' : ''}${order.direccionEnvio.depto ? Utils.escape(order.direccionEnvio.depto) : ''}</p>
            <p class="text-sm text-slate-600">${Utils.escape(order.direccionEnvio.ciudad)}, ${Utils.escape(order.direccionEnvio.provincia)}</p>
            <p class="text-sm text-slate-600">CP ${Utils.escape(order.direccionEnvio.cp)}</p>
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-slate-800 mb-3">Pago</h3>
            <p class="text-sm text-slate-700 font-medium">${pagoLabel}</p>
            ${order.pagoDetalle.ultimos4 ? `<p class="text-xs text-slate-500">**** **** **** ${order.pagoDetalle.ultimos4}</p>` : ''}
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-slate-800 mb-3">Resumen</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span>Subtotal</span><span>${Utils.formatPrice(order.subtotal)}</span></div>
              ${order.descuento > 0 ? `<div class="flex justify-between text-emerald-600"><span>Descuento</span><span>-${Utils.formatPrice(order.descuento)}</span></div>` : ''}
              <div class="flex justify-between"><span>Envío</span><span>${order.envio === 0 ? 'Gratis' : Utils.formatPrice(order.envio)}</span></div>
              <div class="flex justify-between font-bold border-t border-slate-200 pt-2 mt-2 text-base"><span>Total</span><span class="text-primary-600">${Utils.formatPrice(order.total)}</span></div>
            </div>
          </div>

          <a href="perfil.html" class="btn-secondary w-full">← Volver al historial</a>
        </aside>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    render();
  });
})();