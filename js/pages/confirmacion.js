/* ============================================================
   CONFIRMACION.JS — Comprobante de compra
   ============================================================ */

(function() {
  function render() {
    const id = Utils.getQueryParam('id');
    const order = id ? Orders.byId(id) : null;
    const root = document.getElementById('confContent');

    if (!order) {
      root.innerHTML = `
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🤔</div>
          <h2 class="text-xl font-bold text-slate-800 mb-2">No encontramos el pedido</h2>
          <a href="index.html" class="btn-primary">Volver al inicio</a>
        </div>
      `;
      return;
    }

    const envioLabel = { standard: 'Standard (3-5 días)', express: 'Express (24-48 hs)', retiro: 'Retiro en tienda' }[order.envioTipo];
    const pagoLabel  = { cash: 'Efectivo contra entrega', transfer: 'Transferencia bancaria', tarjeta: 'Tarjeta de crédito/débito' }[order.pagoMetodo];

    root.innerHTML = `
      <div class="text-center mb-8 animate-fade-in">
        <div class="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900">¡Compra realizada con éxito!</h1>
        <p class="mt-2 text-slate-600">Te enviamos los detalles a tu email</p>
      </div>

      <div class="card p-6 print-area" id="printArea">
        <div class="flex flex-wrap justify-between items-start border-b border-slate-200 pb-4 mb-4 gap-3">
          <div>
            <img src="assets/logo.svg" class="h-10 w-10">
            <p class="font-bold text-lg text-slate-800 mt-2">La<span class="text-primary-600">Verdu</span></p>
            <p class="text-xs text-slate-500">Av. Corrientes 1234, CABA</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-500 uppercase">Comprobante</p>
            <p class="font-bold text-lg text-slate-800">${order.id}</p>
            <p class="text-sm text-slate-600">${Utils.formatDateTime(order.fecha)}</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">Cliente</h4>
            <p class="text-slate-800 font-semibold">${Utils.escape(order.direccionEnvio.nombre)}</p>
            <p class="text-sm text-slate-600">${Utils.escape(order.direccionEnvio.email)}</p>
            <p class="text-sm text-slate-600">${Utils.escape(order.direccionEnvio.telefono)}</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-700 text-sm uppercase mb-1">Envío</h4>
            <p class="text-slate-800">${Utils.escape(order.direccionEnvio.calle)} ${Utils.escape(order.direccionEnvio.numero)} ${order.direccionEnvio.piso ? `Piso ${Utils.escape(order.direccionEnvio.piso)}` : ''} ${order.direccionEnvio.depto ? `${Utils.escape(order.direccionEnvio.depto)}` : ''}</p>
            <p class="text-sm text-slate-600">${Utils.escape(order.direccionEnvio.ciudad)}, ${Utils.escape(order.direccionEnvio.provincia)} (${Utils.escape(order.direccionEnvio.cp)})</p>
            <p class="text-sm text-slate-600 mt-1">${envioLabel}</p>
          </div>
        </div>

        <h4 class="font-bold text-slate-700 text-sm uppercase mb-2">Productos</h4>
        <table class="w-full mb-4 text-sm">
          <thead class="bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th class="text-left px-3 py-2">Producto</th>
              <th class="text-center px-3 py-2">Cant.</th>
              <th class="text-right px-3 py-2">Precio</th>
              <th class="text-right px-3 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">${Utils.escape(item.nombre)}</td>
                <td class="px-3 py-2 text-center">${item.qty}</td>
                <td class="px-3 py-2 text-right">${Utils.formatPrice(item.precio)}</td>
                <td class="px-3 py-2 text-right font-semibold">${Utils.formatPrice(item.precio * item.qty)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="flex justify-end">
          <div class="w-64 text-sm space-y-1">
            <div class="flex justify-between"><span>Subtotal</span><span>${Utils.formatPrice(order.subtotal)}</span></div>
            ${order.descuento > 0 ? `<div class="flex justify-between text-emerald-600"><span>Descuento</span><span>-${Utils.formatPrice(order.descuento)}</span></div>` : ''}
            <div class="flex justify-between"><span>Envío</span><span>${order.envio === 0 ? 'Gratis' : Utils.formatPrice(order.envio)}</span></div>
            <div class="flex justify-between border-t border-slate-200 pt-2 mt-2 text-base"><span class="font-bold">Total</span><span class="font-extrabold text-primary-600">${Utils.formatPrice(order.total)}</span></div>
          </div>
        </div>

        <div class="border-t border-slate-200 mt-4 pt-3 text-xs text-slate-600">
          <p><strong>Medio de pago:</strong> ${pagoLabel} ${order.pagoDetalle.ultimos4 ? `(**** **** **** ${order.pagoDetalle.ultimos4})` : ''}</p>
          <p><strong>Estado:</strong> <span class="badge bg-emerald-100 text-emerald-700">${order.estado}</span></p>
        </div>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center no-print">
        <button id="printBtn" class="btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Imprimir comprobante
        </button>
        <a href="perfil.html" class="btn-secondary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
          Ver historial de pedidos
        </a>
      </div>
    `;

    document.getElementById('printBtn').addEventListener('click', () => window.print());
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    render();
  });
})();