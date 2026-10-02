/* ============================================================
   AUTH.JS (página) — Registro / Login / Recuperar
   ============================================================ */

(function() {

  function getReturnUrl() {
    const ret = Utils.getQueryParam('return');
    return ret && ret.startsWith('/') ? ret : 'index.html';
  }

  /* ============ REGISTRO ============ */
  function initRegistro() {
    const form = document.getElementById('registroForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const pass  = data.get('password');
      const pass2 = data.get('password2');
      const email = data.get('email');

      if (pass.length < 6) { Toast.error('La contraseña debe tener al menos 6 caracteres'); return; }
      if (pass !== pass2) { Toast.error('Las contraseñas no coinciden'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { Toast.error('Email inválido'); return; }

      try {
        Auth.register({
          nombre: data.get('nombre'),
          apellido: data.get('apellido'),
          email,
          telefono: data.get('telefono'),
          password: pass,
          direccion: {
            calle: data.get('calle') || '',
            numero: data.get('numero') || '',
            ciudad: data.get('ciudad') || '',
            cp: data.get('cp') || '',
            provincia: data.get('provincia') || ''
          }
        });
        Toast.success('¡Bienvenido/a a La Verdu!');
        Utils.redirect('index.html', 800);
      } catch (err) {
        Toast.error(err.message);
      }
    });
  }

  /* ============ LOGIN ============ */
  function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        Auth.login({ email: data.get('email'), password: data.get('password') });
        Toast.success('¡Bienvenido de vuelta!');
        Utils.redirect(getReturnUrl(), 600);
      } catch (err) {
        Toast.error(err.message);
      }
    });

    // Si está logueado, redirigir
    if (Auth.currentUser()) {
      window.location.href = 'perfil.html';
    }
  }

  /* ============ RECUPERAR ============ */
  function initRecuperar() {
    const form = document.getElementById('recuperarForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const email = data.get('email');
      try {
        Auth.recover(email);
        // Por seguridad no revelar si existe
        document.getElementById('recuperarContent').innerHTML = `
          <div class="card p-8 text-center">
            <div class="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h2 class="text-xl font-bold text-slate-800 mb-2">Revisá tu casilla</h2>
            <p class="text-slate-600 mb-6">Si el email <strong>${Utils.escape(email)}</strong> está registrado, te enviamos un enlace para restablecer tu contraseña.</p>
            <a href="login.html" class="btn-primary">Volver al login</a>
          </div>
        `;
      } catch (err) {
        Toast.error(err.message);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    Layout.render();
    initRegistro();
    initLogin();
    initRecuperar();
  });
})();