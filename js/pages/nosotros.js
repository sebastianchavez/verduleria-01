/* ============================================================
   NOSOTROS.JS
   ============================================================ */

(function() {
  function renderEquipo() {
    const root = document.getElementById('equipoGrid');
    if (!root) return;
    root.innerHTML = EQUIPO.map(m => `
      <div class="card overflow-hidden text-center hover:shadow-lg transition">
        <div class="aspect-square overflow-hidden bg-slate-100">
          <img src="https://picsum.photos/seed/team-${m.id}/400/400" alt="${Utils.escape(m.nombre)}"
               class="w-full h-full object-cover"
               onerror="this.onerror=null;this.src='assets/fallback.svg'">
        </div>
        <div class="p-5">
          <h3 class="font-bold text-slate-800">${m.nombre}</h3>
          <p class="text-primary-600 text-sm font-medium">${m.rol}</p>
          <p class="mt-3 text-slate-600 text-sm line-clamp-3">${m.bio}</p>
        </div>
      </div>
    `).join('');
  }

  function renderStats() {
    const root = document.getElementById('statsGrid');
    if (!root) return;
    const s = INFO_TIENDA.stats;
    const data = [
      { v: s.años, label: 'Años en el mercado', icon: '🗓️' },
      { v: '+' + s.pedidos.toLocaleString('es-AR'), label: 'Clientes felices', icon: '😊' },
      { v: '+' + s.productos, label: 'Productos', icon: '🥬' },
      { v: s.satisfaccion + '%', label: 'Satisfacción', icon: '⭐' }
    ];
    root.innerHTML = data.map(d => `
      <div class="text-center">
        <div class="text-5xl mb-2">${d.icon}</div>
        <div class="text-4xl md:text-5xl font-extrabold text-primary-600">${d.v}</div>
        <div class="mt-2 text-slate-600 font-medium">${d.label}</div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    renderEquipo();
    renderStats();
  });
})();