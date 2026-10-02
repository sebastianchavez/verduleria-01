/* ============================================================
   LAYOUT.JS — Inyecta navbar y footer compartidos
   ============================================================ */

const Layout = {

  NAV_LINKS: [
    { href: 'index.html',     label: 'Inicio'    },
    { href: 'productos.html', label: 'Productos' },
    { href: 'nosotros.html',  label: 'Nosotros'  },
    { href: 'contacto.html',  label: 'Contacto'  }
  ],

  navHTML() {
    const user = Auth.currentUser();
    const userLinks = user
        ? `<a href="perfil.html" class="btn-ghost">Mi Perfil</a>
           <button id="logoutBtn" class="btn-ghost">Cerrar sesión</button>`
        : `<a href="login.html" class="btn-ghost">Ingresar</a>
           <a href="registro.html" class="btn-primary text-sm">Registrarse</a>`;

    const links = this.NAV_LINKS.map(l =>
      `<a href="${l.href}" class="text-slate-700 hover:text-primary-600 font-medium transition px-3 py-2 rounded-lg hover:bg-primary-50">${l.label}</a>`
    ).join('');

    return `
      <nav class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-8">
              <a href="index.html" class="flex items-center gap-2">
                <img src="assets/logo.svg" alt="La Verdu" class="h-9 w-9">
                <span class="font-extrabold text-xl text-slate-800">La<span class="text-primary-600">Verdu</span></span>
              </a>
              <div class="hidden md:flex items-center gap-1">${links}</div>
            </div>
            <div class="flex items-center gap-2">
              <div class="hidden sm:block relative">
                <input id="navSearch" type="search" placeholder="Buscar productos..." class="input w-56 lg:w-64 pl-9">
                <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
              </div>
              <a href="carrito.html" class="relative p-2 rounded-lg hover:bg-slate-100 transition">
                <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m13-6l-2 6M9 21a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                <span data-cart-badge class="hidden absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </a>
              <div class="hidden sm:flex items-center gap-1">${userLinks}</div>
              <button id="mobileBtn" class="md:hidden p-2 rounded-lg hover:bg-slate-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div id="mobileMenu" class="mobile-menu md:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-xl border-r border-slate-200">
          <div class="p-4 border-b border-slate-200 flex items-center justify-between">
            <span class="font-bold text-slate-800">Menú</span>
            <button id="mobileClose" class="p-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
          <div class="p-4 flex flex-col gap-1">
            ${this.NAV_LINKS.map(l => `<a href="${l.href}" class="block px-3 py-2.5 rounded-lg hover:bg-primary-50 text-slate-700 font-medium">${l.label}</a>`).join('')}
            <div class="border-t border-slate-200 my-2"></div>
            ${user
              ? `<a href="perfil.html" class="block px-3 py-2.5 rounded-lg hover:bg-primary-50 text-slate-700 font-medium">Mi Perfil</a>
                 <button id="mobileLogout" class="w-full text-left px-3 py-2.5 rounded-lg hover:bg-primary-50 text-slate-700 font-medium">Cerrar sesión</button>`
              : `<a href="login.html" class="block px-3 py-2.5 rounded-lg hover:bg-primary-50 text-slate-700 font-medium">Ingresar</a>
                 <a href="registro.html" class="block px-3 py-2.5 rounded-lg hover:bg-primary-50 text-slate-700 font-medium">Registrarse</a>`}
          </div>
        </div>
      </nav>
    `;
  },

  footerHTML() {
    return `
      <footer class="bg-slate-900 text-slate-300 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <img src="assets/logo.svg" class="h-8 w-8">
                <span class="font-extrabold text-lg text-white">La<span class="text-primary-400">Verdu</span></span>
              </div>
              <p class="text-sm">${INFO_TIENDA.descripcion}</p>
            </div>
            <div>
              <h4 class="font-bold text-white mb-4">Tienda</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="productos.html" class="hover:text-primary-400">Todos los productos</a></li>
                <li><a href="productos.html?cat=frutas" class="hover:text-primary-400">Frutas</a></li>
                <li><a href="productos.html?cat=verduras" class="hover:text-primary-400">Verduras</a></li>
                <li><a href="productos.html?cat=organicos" class="hover:text-primary-400">Orgánicos</a></li>
                <li><a href="productos.html?cat=combos" class="hover:text-primary-400">Combos</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-white mb-4">Empresa</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="nosotros.html" class="hover:text-primary-400">Nosotros</a></li>
                <li><a href="contacto.html" class="hover:text-primary-400">Contacto</a></li>
                <li><a href="perfil.html" class="hover:text-primary-400">Mi cuenta</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-white mb-4">Ayuda</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="politicas-privacidad.html" class="hover:text-primary-400">Políticas de privacidad</a></li>
                <li><a href="terminos-condiciones.html" class="hover:text-primary-400">Términos y condiciones</a></li>
                <li><a href="contacto.html" class="hover:text-primary-400">Envíos y devoluciones</a></li>
              </ul>
              <div class="mt-4 flex gap-3">
                <a href="${INFO_TIENDA.redes.facebook}" target="_blank" class="hover:text-primary-400" aria-label="Facebook">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="${INFO_TIENDA.redes.instagram}" target="_blank" class="hover:text-primary-400" aria-label="Instagram">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.354.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.44 1.44s.645 1.44 1.44 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
                </a>
                <a href="${INFO_TIENDA.redes.whatsapp}" target="_blank" class="hover:text-primary-400" aria-label="WhatsApp">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-slate-800 mt-8 pt-6 text-center text-sm">
            <p>&copy; ${new Date().getFullYear()} La Verdu. Todos los derechos reservados. | Hecho con <span class="text-primary-400">❤</span> para una alimentación más sana.</p>
          </div>
        </div>
      </footer>
    `;
  },

  render() {
    const navContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');
    if (navContainer)    navContainer.innerHTML    = this.navHTML();
    if (footerContainer) footerContainer.innerHTML = this.footerHTML();

    Cart.updateBadge();

    const logout = () => {
      Auth.logout();
      Toast.success('Sesión cerrada');
      setTimeout(() => window.location.reload(), 500);
    };

    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.getElementById('mobileLogout')?.addEventListener('click', logout);

    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    mobileBtn?.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));

    const navSearch = document.getElementById('navSearch');
    if (navSearch) {
      navSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = navSearch.value.trim();
          if (q) window.location.href = `productos.html?q=${encodeURIComponent(q)}`;
        }
      });
    }
  }
};