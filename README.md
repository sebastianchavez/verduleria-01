# La Verdu — Web Ecommerce de Verdulería

Web ecommerce completa y lista para usar, construida con **HTML + Tailwind CSS (CDN) + JavaScript vanilla**, sin necesidad de build step ni backend. Todos los datos son mockeados y se persisten en `localStorage`.

## Características

- **16 páginas** funcionales con navegación completa
- **Catálogo** con 25 productos mockeados en 6 categorías
- **Carrito de compras** persistente con localStorage
- **Sistema de autenticación** simulado (login/registro/recuperar)
- **Checkout** completo (dirección + tipo de envío + medio de pago)
- **Pedidos** con timeline de estados y historial
- **Reseñas** con sistema de estrellas
- **Cupones de descuento** (`VERDE10`, `FRESCO15`)
- **Imágenes** servidas desde Picsum (Lorem Picsum) con fallback SVG
- **Mobile-first** responsive
- **Datos persistentes** en localStorage (carrito, usuario, pedidos, reseñas)

## Páginas

| # | URL | Descripción |
|---|-----|-------------|
| 1 | `index.html` | Landing page con hero, categorías y productos destacados |
| 2 | `nosotros.html` | Historia, equipo, misión/visión |
| 3 | `productos.html` | Catálogo con filtros, búsqueda y sort |
| 4 | `producto-detalle.html?id=X` | Detalle con reseñas, info nutricional y productos relacionados |
| 5 | `contacto.html` | Formulario, horarios, mapa y datos |
| 6 | `carrito.html` | Gestión de items con cupones |
| 7 | `checkout.html` | Dirección + envío + pago |
| 8 | `confirmacion.html?id=X` | Comprobante con botones de imprimir y ver historial |
| 9 | `perfil.html` | Mi perfil + historial de pedidos + reseñas |
| 10 | `pedido-detalle.html?id=X` | Detalle de pedido con timeline |
| 11 | `resena.html?producto=X` | Formulario de reseña con estrellas |
| 12 | `login.html` | Inicio de sesión |
| 13 | `registro.html` | Registro de usuario |
| 14 | `recuperar-contrasena.html` | Recuperación de contraseña |
| 15 | `politicas-privacidad.html` | Política de privacidad |
| 16 | `terminos-condiciones.html` | Términos y condiciones |

## Estructura de archivos

```
/
├── index.html, ...                       (HTML pages)
├── README.md
├── assets/
│   ├── logo.svg, favicon.svg, fallback.svg
├── css/
│   └── styles.css
└── js/
    ├── data.js          (mock: productos, categorías, equipo, reseñas)
    ├── utils.js         (formato ARS, toast, helpers)
    ├── auth.js          (login/register/recover con localStorage)
    ├── cart.js          (carrito + cupones)
    ├── reviews.js       (CRUD reseñas)
    ├── orders.js        (CRUD pedidos)
    ├── layout.js        (navbar + footer compartidos)
    └── pages/
            ├── landing.js
            ├── nosotros.js
            ├── productos.js
            ├── detalle.js
            ├── contacto.js
            ├── carrito.js
            ├── checkout.js
            ├── confirmacion.js
            ├── perfil.js
            ├── pedido-detalle.js
            ├── resena.js
            └── auth.js
```

## Cómo usar

1. Clonar o descargar este directorio.
2. Abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
3. ¡Listo, no requiere build step ni servidor!

> **Tip:** Si tu navegador bloquea los `localStorage` en `file://`, serví los archivos con cualquier servidor estático, por ejemplo:
> ```bash
> # Python
> python -m http.server 8000
> # Node
> npx serve .
> # VS Code: extensión Live Server
> ```

## Funcionalidades de demostración

### Cupones de descuento
- `VERDE10` → 10% off
- `FRESCO15` → 15% off

### Tipos de envío
- **Standard** (3-5 días): gratis en >$5000, sino $1500
- **Express** (24-48 hs): $2500
- **Retiro en tienda**: gratis

### Medios de pago
- **Efectivo contra entrega**: 10% off
- **Transferencia bancaria**
- **Tarjeta** (datos no se procesan, demo)

## Persistencia

Todos los datos se guardan en `localStorage` bajo estas claves:
- `verduleria_cart` — items del carrito
- `verduleria_coupon` — cupón aplicado
- `verduleria_users` — usuarios registrados
- `verduleria_currentUser` — usuario logueado
- `verduleria_orders` — historial de pedidos
- `verduleria_reviews` — reseñas de productos

Para resetear todo: en la consola del navegador ejecutá `localStorage.clear()` y volvé a cargar la página.

## Personalización

### Cambiar paleta de colores
Editá la config de Tailwind en cada `<head>` de los HTML:
```js
tailwind.config = {
  theme: { extend: { colors: { primary: { 500:'#10b981', 600:'#059669', 700:'#047857' } } } }
}
```

### Cambiar la moneda
En `js/utils.js`, modificá la función `formatPrice` con la moneda deseada.

### Agregar productos
En `js/data.js`, agregá objetos al array `PRODUCTOS` con la misma estructura:
```js
{ id: 26, nombre: '...', slug: '...', categoria: 'frutas', precio: 1000, stock: 50, imagen: 'apple', descripcion: '...', infoNutricional: '...', organico: false, destacado: false, rating: 4.5 }
```

## Stack

- HTML5
- Tailwind CSS 3.x (CDN)
- JavaScript vanilla (ES6+)
- localStorage API
- Google Fonts (Inter)
- Picsum (imágenes demo)

## Licencia

Template de demostración. Adaptá libremente a tus necesidades.