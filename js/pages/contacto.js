/* ============================================================
   CONTACTO.JS
   ============================================================ */

(function() {
  function renderHorarios() {
    const root = document.getElementById('horariosTable');
    if (!root) return;
    root.innerHTML = INFO_TIENDA.horarios.map(h => `
      <div class="flex justify-between py-3 border-b border-slate-100 last:border-0">
        <span class="font-medium text-slate-700">${h.dia}</span>
        <span class="text-slate-600">${h.horario}</span>
      </div>
    `).join('');
  }

  function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get('nombre')?.trim();
      const email = data.get('email')?.trim();
      const mensaje = data.get('mensaje')?.trim();
      if (!nombre || !email || !mensaje) {
        Toast.error('Completá todos los campos obligatorios');
        return;
      }
      // Simular
      Toast.success('¡Mensaje enviado! Te responderemos a la brevedad.');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    renderHorarios();
    initForm();
  });
})();