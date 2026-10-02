/* ============================================================
   AUTH.JS — Autenticación simulada con localStorage
   ============================================================ */

const Auth = {
  USERS_KEY: 'verduleria_users',
  CURRENT_KEY: 'verduleria_currentUser',

  _read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  },
  _write(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  getUsers() { return this._read(this.USERS_KEY); },
  saveUsers(users) { this._write(this.USERS_KEY, users); },

  currentUser() {
    try {
      const raw = localStorage.getItem(this.CURRENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  setCurrentUser(user) {
    if (user) localStorage.setItem(this.CURRENT_KEY, JSON.stringify(user));
    else localStorage.removeItem(this.CURRENT_KEY);
  },

  register({ nombre, apellido, email, telefono, password, direccion }) {
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Ya existe una cuenta con ese email');
    }
    const newUser = {
      id: Utils.generateId(),
      nombre,
      apellido: apellido || '',
      email: email.toLowerCase(),
      telefono: telefono || '',
      password, // ⚠ Simulado, no usar en producción
      direccion: direccion || null,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveUsers(users);
    const safe = { ...newUser };
    delete safe.password;
    this.setCurrentUser(safe);
    return safe;
  },

  login({ email, password }) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Email o contraseña incorrectos');
    const safe = { ...user };
    delete safe.password;
    this.setCurrentUser(safe);
    return safe;
  },

  logout() { this.setCurrentUser(null); },

  recover(email) {
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) throw new Error('Si el email existe, enviaremos las instrucciones');
    return true;
  },

  updateProfile(data) {
    const current = this.currentUser();
    if (!current) throw new Error('No hay sesión activa');
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === current.id);
    if (idx === -1) throw new Error('Usuario no encontrado');
    users[idx] = { ...users[idx], ...data };
    this.saveUsers(users);
    const safe = { ...users[idx] };
    delete safe.password;
    this.setCurrentUser(safe);
    return safe;
  }
};