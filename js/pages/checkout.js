/* ============================================================
   CHECKOUT.JS — Confirmación de pago
   ============================================================ */

(function() {
  let envioTipo = 'standard';
  let pagoMetodo = 'cash';

  function render() {
    const items = Cart.getItems();
    if (items.length === 0) {
      document.getElementById('checkoutContent').innerHTML = `
        <div class="text-center py-20">
          <div class="text-6xl mb-4">🛒</div>
          <h2 class="text-xl font-bold text-slate-800 mb-2">Tu carrito está vacío</h2>
          <p class="text-slate-600 mb-6">Agregá productos antes de finalizar la compra</p>
          <a href="productos.html" class="btn-primary">Ver productos</a>
        </div>
      `;
      return;
    }

    renderSummary();
    initEnvioOptions();
    initPagoOptions();
    initForm();
  }

  function renderSummary() {
    const items = Cart.getItems();
    const root = document.getElementById('summaryItems');
    root.innerHTML = items.map(item => {
      const p = PRODUCTOS.find(x => x.id === item.id);
      const itemTotal = p.precio * item.qty;
      return `
        <div class="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
          <div class="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            <img src="${productImg(p, '120x120')}" alt="${Utils.escape(p.nombre)}" class="w-full h-full object-cover"
                 onerror="this.onerror=null;this.src='assets/fallback.svg'">
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-800 truncate">${p.nombre}</p>
            <p class="text-xs text-slate-500">${item.qty} x ${Utils.formatPrice(p.precio)}</p>
          </div>
          <div class="text-sm font-bold text-slate-800">${Utils.formatPrice(itemTotal)}</div>
        </div>
      `;
    }).join('');

    updateTotals();
  }

  function updateTotals() {
    const subtotal = Cart.getSubtotal();
    const descuento = Cart.getDiscount();
    const envio = Utils.calcShipping(subtotal, envioTipo);
    const pagoCash = pagoMetodo === 'cash';
    const totalBruto = subtotal - descuento + envio;
    const total = pagoCash ? Math.round(totalBruto * 0.9) : totalBruto;

    document.getElementById('subtotalLabel').textContent = Utils.formatPrice(subtotal);
    document.getElementById('envioLabel').textContent     = envio === 0 ? 'Gratis' : Utils.formatPrice(envio);
    document.getElementById('totalLabel').textContent     = Utils.formatPrice(total);

    const descRow = document.getElementById('descuentoRow');
    if (descuento > 0) {
      descRow.classList.remove('hidden');
      document.getElementById('descuentoLabel').textContent = `- ${Utils.formatPrice(descuento)}`;
    } else descRow.classList.add('hidden');

    const cashRow = document.getElementById('cashRow');
    if (pagoCash) {
      cashRow.classList.remove('hidden');
      document.getElementById('cashLabel').textContent = `- ${Utils.formatPrice(Math.round(totalBruto * 0.1))} (10% off)`;
    } else cashRow.classList.add('hidden');
  }

  function initEnvioOptions() {
    document.querySelectorAll('[name=envio]').forEach(r => r.addEventListener('change', (e) => {
      envioTipo = e.target.value;
      updateTotals();
    }));
  }

  function initPagoOptions() {
    document.querySelectorAll('[name=pago]').forEach(r => r.addEventListener('change', (e) => {
      pagoMetodo = e.target.value;
      document.querySelectorAll('[data-pago-detail]').forEach(el => el.classList.add('hidden'));
      const detail = document.querySelector(`[data-pago-detail="${pagoMetodo}"]`);
      if (detail) detail.classList.remove('hidden');
      updateTotals();
    }));
  }

  function initForm() {
    const form = document.getElementById('checkoutForm');
    if (form._init) return;
    form._init = true;

    // Pre-llenar con usuario
    const user = Auth.currentUser();
    if (user && user.direccion) {
      if (user.direccion.calle)   document.getElementById('calle').value   = user.direccion.calle || '';
      if (user.direccion.numero)  document.getElementById('numero').value  = user.direccion.numero || '';
      if (user.direccion.ciudad)  document.getElementById('ciudad').value  = user.direccion.ciudad || '';
      if (user.direccion.cp)      document.getElementById('cp').value      = user.direccion.cp || '';
      if (user.direccion.provincia) document.getElementById('provincia').value = user.direccion.provincia || '';
      if (user.telefono) document.getElementById('telefono').value = user.telefono || '';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);

      // Validación
      const required = ['nombre', 'email', 'telefono', 'calle', 'numero', 'ciudad', 'cp', 'provincia'];
      for (const f of required) {
        if (!data.get(f)?.toString().trim()) {
          Toast.error('Completá todos los campos obligatorios');
          return;
        }
      }

      const items = Cart.getItems();
      const subtotal = Cart.getSubtotal();
      const descuento = Cart.getDiscount();
      const envio = Utils.calcShipping(subtotal, envioTipo);
      const totalBruto = subtotal - descuento + envio;
      const total = pagoMetodo === 'cash' ? Math.round(totalBruto * 0.9) : totalBruto;

      const order = Orders.create({
        userId: user?.id || null,
        userName: user ? `${user.nombre} ${user.apellido || ''}`.trim() : data.get('nombre'),
        items: items.map(i => {
          const p = PRODUCTOS.find(x => x.id === i.id);
          return { id: i.id, nombre: p.nombre, precio: p.precio, qty: i.qty, imagen: p.imagen };
        }),
        subtotal, descuento, envio, total,
        direccionEnvio: {
          nombre: data.get('nombre'),
          email: data.get('email'),
          telefono: data.get('telefono'),
          calle: data.get('calle'),
          numero: data.get('numero'),
          piso: data.get('piso') || '',
          depto: data.get('depto') || '',
          ciudad: data.get('ciudad'),
          cp: data.get('cp'),
          provincia: data.get('provincia'),
          notas: data.get('notas') || ''
        },
        envioTipo,
        pagoMetodo,
        pagoDetalle: pagoMetodo === 'tarjeta'
          ? { ultimos4: (data.get('tarjeta') || '').replace(/\s/g, '').slice(-4), titular: data.get('titular') }
          : {}
      });

      Cart.clear();
      window.location.href = `confirmacion.html?id=${order.id}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    render();
  });
})();