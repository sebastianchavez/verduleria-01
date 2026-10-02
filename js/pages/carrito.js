/* ============================================================
   CARRITO.JS — Página del carrito
   ============================================================ */

(function() {
  let cuponAplicado = Cart.getCoupon();

  function render() {
    const items = Cart.getItems();
    const empty = document.getElementById('emptyState');
    const cont = document.getElementById('cartContent');

    if (items.length === 0) {
      empty.classList.remove('hidden');
      cont.classList.add('hidden');
      return;
    }
    empty.classList.add('hidden');
    cont.classList.remove('hidden');

    renderItems();
    renderSummary();
  }

  function renderItems() {
    const items = Cart.getItems();
    const subtotal = Cart.getSubtotal();
    const root = document.getElementById('cartItems');
    root.innerHTML = items.map(item => {
      const p = PRODUCTOS.find(x => x.id === item.id);
      const itemTotal = p.precio * item.qty;
      return `
        <tr class="border-b border-slate-100">
          <td class="py-4">
            <div class="flex items-center gap-4">
              <a href="producto-detalle.html?id=${p.id}" class="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img src="${productImg(p, '200x200')}" alt="${Utils.escape(p.nombre)}" class="w-full h-full object-cover"
                     onerror="this.onerror=null;this.src='assets/fallback.svg'">
              </a>
              <div>
                <h4 class="font-semibold text-slate-800"><a href="producto-detalle.html?id=${p.id}" class="hover:text-primary-600">${p.nombre}</a></h4>
                <p class="text-sm text-slate-500">${Utils.formatPrice(p.precio)} c/u</p>
                <button class="text-red-600 hover:underline text-xs mt-1" data-action="remove" data-id="${p.id}">Eliminar</button>
              </div>
            </div>
          </td>
          <td class="py-4 text-center">
            <div class="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button class="qty-dec px-2 py-1 hover:bg-slate-100" data-id="${p.id}">−</button>
              <input type="number" min="1" value="${item.qty}" class="w-12 text-center border-x border-slate-200 py-1 focus:outline-none qty-input" data-id="${p.id}">
              <button class="qty-inc px-2 py-1 hover:bg-slate-100" data-id="${p.id}">+</button>
            </div>
          </td>
          <td class="py-4 text-right font-bold text-slate-800">${Utils.formatPrice(itemTotal)}</td>
        </tr>
      `;
    }).join('');

    root.querySelectorAll('[data-action=remove]').forEach(b => b.addEventListener('click', () => {
      Cart.remove(b.dataset.id);
      render();
    }));
    root.querySelectorAll('.qty-inc').forEach(b => b.addEventListener('click', () => {
      const id = Number(b.dataset.id);
      const item = Cart.getItems().find(i => i.id === id);
      if (item) Cart.update(id, item.qty + 1);
      render();
    }));
    root.querySelectorAll('.qty-dec').forEach(b => b.addEventListener('click', () => {
      const id = Number(b.dataset.id);
      const item = Cart.getItems().find(i => i.id === id);
      if (item) Cart.update(id, item.qty - 1);
      render();
    }));
    root.querySelectorAll('.qty-input').forEach(i => i.addEventListener('change', () => {
      const id = Number(i.dataset.id);
      Cart.update(id, Number(i.value) || 1);
      render();
    }));
  }

  function renderSummary() {
    const subtotal = Cart.getSubtotal();
    const envio = subtotal >= 5000 ? 0 : 1500;
    const descuento = Cart.getDiscount();
    const coupon = Cart.getCoupon();
    const total = subtotal - descuento + envio;

    document.getElementById('subtotalLabel').textContent = Utils.formatPrice(subtotal);
    document.getElementById('envioLabel').textContent = envio === 0 ? 'Gratis' : Utils.formatPrice(envio);
    document.getElementById('totalLabel').textContent = Utils.formatPrice(total);

    const descRow = document.getElementById('descuentoRow');
    if (descuento > 0) {
      descRow.classList.remove('hidden');
      document.getElementById('descuentoLabel').textContent = `- ${Utils.formatPrice(descuento)} (${coupon.code})`;
    } else {
      descRow.classList.add('hidden');
    }

    const cuponRow = document.getElementById('cuponAplicado');
    if (coupon) {
      cuponRow.classList.remove('hidden');
      document.getElementById('cuponText').textContent = `${coupon.code} (${coupon.descripcion})`;
    } else {
      cuponRow.classList.add('hidden');
    }
  }

  function initCupon() {
    const btn = document.getElementById('applyCuponBtn');
    const input = document.getElementById('cuponInput');
    btn?.addEventListener('click', () => {
      const c = Cart.applyCoupon(input.value);
      if (c) render();
    });
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
    });

    document.getElementById('quitarCuponBtn')?.addEventListener('click', () => {
      Cart.removeCoupon();
      render();
    });
  }

  function init() {
    Layout.render();
    render();
    initCupon();
  }

  document.addEventListener('DOMContentLoaded', init);
})();