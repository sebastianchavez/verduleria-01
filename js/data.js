/* ============================================================
   DATA.JS — Mock data: productos, categorías, equipo, seed
   ============================================================ */

const CATEGORIAS = [
  { id: 'frutas',       nombre: 'Frutas',            icono: '🍎', descripcion: 'Frutas frescas de estación' },
  { id: 'verduras',     nombre: 'Verduras',          icono: '🥦', descripcion: 'Verduras frescas del campo' },
  { id: 'hierbas',      nombre: 'Hierbas aromáticas', icono: '🌿', descripcion: 'Hierbas frescas y de tienda' },
  { id: 'legumbres',    nombre: 'Legumbres',         icono: '🫘', descripcion: 'Legumbres seleccionadas' },
  { id: 'organicos',    nombre: 'Orgánicos',         icono: '🌱', descripcion: 'Productos 100% orgánicos' },
  { id: 'combos',       nombre: 'Combos',            icono: '🧺', descripcion: 'Combos y promociones especiales' }
];

const PRODUCTOS = [
  // FRUTAS
  { id: 1,  nombre: 'Manzanas Rojas',     slug: 'manzanas-rojas',     categoria: 'frutas',    precio: 2500,  precioAnterior: 3000,  stock: 50, imagen: 'red-apple',       descripcion: 'Manzanas rojas crujientes y dulces, perfectas para consumir frescas o en ensaladas.',         infoNutricional: 'Por 100g: 52 kcal, 14g carbohidratos, 0.3g grasa, 2.4g fibra, 10.4g azúcares. Vitamina C.', organico: false, destacado: true, rating: 4.7 },
  { id: 2,  nombre: 'Bananas',           slug: 'bananas',            categoria: 'frutas',    precio: 1800,  stock: 80, imagen: 'banana',           descripcion: 'Bananas maduras, fuente natural de potasio y energía.',                                          infoNutricional: 'Por 100g: 89 kcal, 23g carbohidratos, 0.3g grasa, 2.6g fibra. Alto en potasio.',            organico: false, destacado: true, rating: 4.8 },
  { id: 3,  nombre: 'Naranjas de Jugos', slug: 'naranjas-jugo',      categoria: 'frutas',    precio: 2200,  stock: 60, imagen: 'orange',           descripcion: 'Naranjas jugosas ideales para jugos naturales y refrescantes.',                              infoNutricional: 'Por 100g: 47 kcal, 12g carbohidratos, 0.1g grasa, 2.4g fibra. Vitamina C.',                organico: false, destacado: false, rating: 4.6 },
  { id: 4,  nombre: 'Frutillas',         slug: 'frutillas',          categoria: 'frutas',    precio: 4500,  stock: 25, imagen: 'strawberry',       descripcion: 'Frutillas frescas y dulces, perfectas para postres y desayunos.',                              infoNutricional: 'Por 100g: 32 kcal, 7.7g carbohidratos, 0.3g grasa, 2g fibra. Vitamina C.',                organico: true,  destacado: true, rating: 4.9 },
  { id: 5,  nombre: 'Peras Williams',    slug: 'peras-williams',     categoria: 'frutas',    precio: 2800,  stock: 40, imagen: 'pear',             descripcion: 'Peras Williams maduras, dulces y jugosas.',                                                       infoNutricional: 'Por 100g: 57 kcal, 15g carbohidratos, 0.1g grasa, 3.1g fibra.',                            organico: false, destacado: false, rating: 4.5 },
  { id: 6,  nombre: 'Uvas Verdes',       slug: 'uvas-verdes',        categoria: 'frutas',    precio: 3800,  stock: 30, imagen: 'green-grape',      descripcion: 'Uvas verdes sin semillas, dulces y refrescantes.',                                               infoNutricional: 'Por 100g: 69 kcal, 18g carbohidratos, 0.2g grasa, 0.9g fibra.',                            organico: false, destacado: false, rating: 4.4 },
  { id: 7,  nombre: 'Limones',           slug: 'limones',            categoria: 'frutas',    precio: 1500,  stock: 100, imagen: 'lemon',           descripcion: 'Limones frescos, ideales para jugos, aderezos y limonadas.',                                     infoNutricional: 'Por 100g: 29 kcal, 9g carbohidratos, 0.3g grasa, 2.8g fibra. Vitamina C.',                 organico: true,  destacado: false, rating: 4.6 },
  { id: 8,  nombre: 'Sandía',            slug: 'sandia',             categoria: 'frutas',    precio: 5500,  stock: 15, imagen: 'watermelon',       descripcion: 'Sandía dulce y refrescante, perfecta para el verano.',                                           infoNutricional: 'Por 100g: 30 kcal, 7.6g carbohidratos, 0.2g grasa, 0.4g fibra.',                           organico: false, destacado: true, rating: 4.8 },

  // VERDURAS
  { id: 9,  nombre: 'Tomates Perita',    slug: 'tomates-perita',     categoria: 'verduras',  precio: 2900,  stock: 70, imagen: 'tomato',           descripcion: 'Tomates perita frescos, ideales para ensaladas y salsas.',                                       infoNutricional: 'Por 100g: 18 kcal, 3.9g carbohidratos, 0.2g grasa, 1.2g fibra. Licopeno.',                organico: false, destacado: true, rating: 4.7 },
  { id: 10, nombre: 'Lechuga Crespa',    slug: 'lechuga-crespa',     categoria: 'verduras',  precio: 1200,  stock: 45, imagen: 'lettuce',          descripcion: 'Lechuga crespa fresca y crujiente.',                                                              infoNutricional: 'Por 100g: 15 kcal, 2.9g carbohidratos, 0.2g grasa, 1.3g fibra. Vitamina A y K.',           organico: true,  destacado: false, rating: 4.5 },
  { id: 11, nombre: 'Zanahorias',        slug: 'zanahorias',         categoria: 'verduras',  precio: 1400,  stock: 60, imagen: 'carrot',           descripcion: 'Zanahorias frescas y dulces, ricas en vitamina A.',                                                infoNutricional: 'Por 100g: 41 kcal, 9.6g carbohidratos, 0.2g grasa, 2.8g fibra. Beta-caroteno.',          organico: false, destacado: true, rating: 4.6 },
  { id: 12, nombre: 'Brócoli',           slug: 'brocoli',            categoria: 'verduras',  precio: 2400,  stock: 35, imagen: 'broccoli',         descripcion: 'Brócoli fresco, rico en vitaminas y antioxidantes.',                                              infoNutricional: 'Por 100g: 34 kcal, 6.6g carbohidratos, 0.4g grasa, 2.6g fibra. Vitamina C y K.',           organico: true,  destacado: false, rating: 4.7 },
  { id: 13, nombre: 'Espinaca',          slug: 'espinaca',           categoria: 'verduras',  precio: 1800,  stock: 40, imagen: 'spinach',          descripcion: 'Espinaca fresca, ideal para ensaladas y salteados.',                                                infoNutricional: 'Por 100g: 23 kcal, 3.6g carbohidratos, 0.4g grasa, 2.2g fibra. Hierro.',                  organico: true,  destacado: false, rating: 4.5 },
  { id: 14, nombre: 'Papas',           slug: 'papas',              categoria: 'verduras',  precio: 1600,  stock: 100, imagen: 'potato',          descripcion: 'Papas seleccionadas, ideales para freír, hornear o puré.',                                       infoNutricional: 'Por 100g: 77 kcal, 17g carbohidratos, 0.1g grasa, 2.2g fibra. Vitamina C.',                organico: false, destacado: false, rating: 4.6 },
  { id: 15, nombre: 'Cebolla',          slug: 'cebolla',            categoria: 'verduras',  precio: 1300,  stock: 90, imagen: 'onion',            descripcion: 'Cebollas frescas, base de toda buena cocina.',                                                    infoNutricional: 'Por 100g: 40 kcal, 9.3g carbohidratos, 0.1g grasa, 1.7g fibra.',                         organico: false, destacado: false, rating: 4.5 },
  { id: 16, nombre: 'Morrón Rojo',      slug: 'morron-rojo',        categoria: 'verduras',  precio: 3200,  stock: 50, imagen: 'red-bell-pepper',   descripcion: 'Morrón rojo fresco y dulce, ideal para ensaladas y salteados.',                                   infoNutricional: 'Por 100g: 31 kcal, 6g carbohidratos, 0.3g grasa, 2.1g fibra. Vitamina C.',                organico: false, destacado: false, rating: 4.6 },

  // HIERBAS
  { id: 17, nombre: 'Perejil',          slug: 'perejil',            categoria: 'hierbas',   precio: 800,   stock: 30, imagen: 'parsley',          descripcion: 'Perejil fresco cortado y lavado, listo para usar.',                                                infoNutricional: 'Por 100g: 36 kcal, 6.3g carbohidratos, 0.8g grasa, 3.3g fibra. Vitamina K.',               organico: true,  destacado: false, rating: 4.7 },
  { id: 18, nombre: 'Albahaca',         slug: 'albahaca',           categoria: 'hierbas',   precio: 1200,  stock: 25, imagen: 'basil',            descripcion: 'Albahaca fresca, perfecta para pesto y platos italianos.',                                        infoNutricional: 'Por 100g: 23 kcal, 2.7g carbohidratos, 0.6g grasa, 1.6g fibra.',                          organico: true,  destacado: true, rating: 4.8 },
  { id: 19, nombre: 'Menta',            slug: 'menta',              categoria: 'hierbas',   precio: 1000,  stock: 20, imagen: 'mint',            descripcion: 'Menta fresca, ideal para infusiones, cócteles y postres.',                                         infoNutricional: 'Por 100g: 70 kcal, 14.9g carbohidratos, 0.9g grasa, 8g fibra.',                           organico: true,  destacado: false, rating: 4.6 },

  // LEGUMBRES
  { id: 20, nombre: 'Lentejas',         slug: 'lentejas',           categoria: 'legumbres', precio: 2200,  stock: 40, imagen: 'lentils',          descripcion: 'Lentejas secas seleccionadas, ricas en proteínas y hierro.',                                    infoNutricional: 'Por 100g: 353 kcal, 60g carbohidratos, 1g grasa, 11g fibra, 25g proteínas.',              organico: false, destacado: false, rating: 4.5 },
  { id: 21, nombre: 'Garbanzos',        slug: 'garbanzos',          categoria: 'legumbres', precio: 2500,  stock: 35, imagen: 'chickpeas',          descripcion: 'Garbanzos secos para preparar ensaladas y hummus.',                                                                          infoNutricional: 'Por 100g: 364 kcal, 61g carbohidratos, 6g grasa, 17g fibra, 19g proteínas.',                organico: false, destacado: false, rating: 4.6 },

  // ORGÁNICOS (re-empaquetados)
  { id: 22, nombre: 'Tomates Orgánicos', slug: 'tomates-organicos',  categoria: 'organicos', precio: 3600,  stock: 30, imagen: 'organic-tomato',   descripcion: 'Tomates cultivados sin agroquímicos, 100% naturales.',                                                infoNutricional: 'Por 100g: 18 kcal, 3.9g carbohidratos, 0.2g grasa, 1.2g fibra.',                            organico: true,  destacado: true, rating: 4.9 },
  { id: 23, nombre: 'Mix de Hojas Verdes', slug: 'mix-hojas-verdes', categoria: 'organicos', precio: 2100,  stock: 25, imagen: 'salad-greens',      descripcion: 'Mezcla de hojas verdes orgánicas: rúcula, espinaca y lechuga.',                                    infoNutricional: 'Por 100g: 22 kcal, 3.6g carbohidratos, 0.4g grasa, 2.4g fibra.',                          organico: true,  destacado: true, rating: 4.8 },

  // COMBOS
  { id: 24, nombre: 'Combo Ensalada Familiar', slug: 'combo-ensalada', categoria: 'combos', precio: 6500, precioAnterior: 7800, stock: 20, imagen: 'salad-bowl',    descripcion: 'Tomates, lechuga, zanahoria, pepino y más. ¡Todo para tu ensalada!',                              infoNutricional: 'Variado: aproximadamente 30 kcal por 100g, alto en fibra.',                                  organico: false, destacado: true, rating: 4.7 },
  { id: 25, nombre: 'Combo Frutas Tropicales', slug: 'combo-frutas-tropicales', categoria: 'combos', precio: 8500, stock: 15, imagen: 'tropical-fruits', descripcion: 'Selección de frutas tropicales: bananas, naranjas, frutillas y más.',                              infoNutricional: 'Por 100g: 60 kcal promedio, rico en vitaminas.',                                              organico: false, destacado: true, rating: 4.8 }
];

const EQUIPO = [
  { id: 1, nombre: 'María González',   rol: 'Fundadora & CEO',         bio: 'Apasionada por la alimentación saludable, fundó La Verdu en 2009 con un sueño: llevar productos frescos a cada hogar.', foto: 'portrait-woman-1' },
  { id: 2, nombre: 'Carlos Pérez',     rol: 'Director de Operaciones', bio: 'Con más de 15 años de experiencia en logística, asegura que cada producto llegue en tiempo y forma.', foto: 'portrait-man-1' },
  { id: 3, nombre: 'Lucía Fernández',  rol: 'Jefa de Calidad',         bio: 'Ingeniera agrónoma, Lucía garantiza que cada producto cumpla con nuestros estándares de calidad.',  foto: 'portrait-woman-2' },
  { id: 4, nombre: 'Diego Martínez',   rol: 'Atención al Cliente',     bio: 'Siempre con una sonrisa, Diego se encarga de que cada cliente tenga la mejor experiencia de compra.', foto: 'portrait-man-2' }
];

const RESENAS_SEED = [
  { id: 1,  productId: 1,  userId: 1, userName: 'María González', rating: 5, titulo: 'Excelentes manzanas', comentario: 'Muy frescas y dulces. Las recomiendo!', fecha: '2026-09-15' },
  { id: 2,  productId: 1,  userId: 2, userName: 'Juan Pérez',     rating: 4, titulo: 'Buenas pero podrían ser más grandes', comentario: 'Buena calidad, pero el tamaño fue menor al de la publicación.', fecha: '2026-09-20' },
  { id: 3,  productId: 4,  userId: 3, userName: 'Ana López',      rating: 5, titulo: 'Las mejores frutillas', comentario: 'Increíble sabor, se nota que son recién cortadas.', fecha: '2026-09-25' },
  { id: 4,  productId: 9,  userId: 4, userName: 'Pedro Ramírez',  rating: 5, titulo: 'Tomates perfectos', comentario: 'Ideales para ensalada. Muy jugosos.', fecha: '2026-09-28' },
  { id: 5,  productId: 18, userId: 5, userName: 'Sofía Castro',   rating: 5, titulo: 'Albahaca aromática', comentario: 'Huele increíble, perfecta para pesto.', fecha: '2026-09-30' },
  { id: 6,  productId: 24, userId: 6, userName: 'Luis Morales',   rating: 4, titulo: 'Buen combo familiar', comentario: 'Buena relación calidad-precio. Volveré a pedir.', fecha: '2026-10-01' }
];

const PEDIDOS_SEED = []; // Se crean dinámicamente al hacer una compra

const CUPONES = {
  'VERDE10':  { descuento: 0.10, descripcion: '10% de descuento' },
  'FRESCO15': { descuento: 0.15, descripcion: '15% de descuento' }
};

const INFO_TIENDA = {
  nombre: 'La Verdu',
  slogan: 'Frescura del campo a tu mesa',
  descripcion: 'Somos una verdulería familiar con más de 15 años llevando productos frescos y de calidad a tu hogar.',
  direccion: 'Av. Corrientes 1234, CABA, Argentina',
  telefono: '+54 11 4567-8900',
  email: 'contacto@laverdu.com',
  whatsapp: '+54 9 11 4567-8900',
  horarios: [
    { dia: 'Lunes a Viernes', horario: '08:00 - 20:00' },
    { dia: 'Sábados',          horario: '08:00 - 20:00' },
    { dia: 'Domingos',          horario: '09:00 - 13:00' },
    { dia: 'Feriados',          horario: 'Cerrado' }
  ],
  redes: {
    facebook: 'https://facebook.com/laverdu',
    instagram: 'https://instagram.com/laverdu',
    twitter: 'https://twitter.com/laverdu',
    whatsapp: 'https://wa.me/5491145678900'
  },
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016632.740100!2d-58.4094!3d-34.4159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzU3LjIiUyA1OMKwMjQnMzUuOCJX!5e0!3m2!1ses!2sar!4v1234567890',
  stats: {
    años: 15,
    pedidos: 5000,
    productos: 200,
    satisfaccion: 100
  }
};

/* ============================================================
   IMAGE HELPER — Picsum (confiable) + fallback SVG
   ============================================================ */
function productImg(product, size = '600') {
  if (!product || !product.imagen) return 'assets/fallback.svg';
  const seed = encodeURIComponent(product.imagen);
  return `https://picsum.photos/seed/${seed}/${size}/${size}`;
}

/* Inicialización: cargar seed si no existe */
(function initSeedData() {
  if (!localStorage.getItem('verduleria_seed_loaded')) {
    localStorage.setItem('verduleria_reviews', JSON.stringify(RESENAS_SEED));
    localStorage.setItem('verduleria_seed_loaded', '1');
  }
})();