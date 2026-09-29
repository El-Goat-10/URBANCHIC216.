# URBANCHIC216 — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias). Se publica tal cual en Netlify, Vercel,
GitHub Pages, Hostinger o cualquier hosting.

```
index.html
assets/css/styles.css
assets/js/main.js
```

## Verlo en el navegador

Doble clic en `index.html`. Para publicarlo: sube la carpeta a un hosting estático o usa
`npx serve` / `python -m http.server 8000`.

## Dónde cambiar las cosas

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `assets/js/main.js` → `const WHATSAPP` (formato internacional, sin `+`) |
| Productos del catálogo | `assets/js/main.js` → `const PRODUCTS` |
| Colores de la marca | `assets/css/styles.css` → bloque `:root` (`--gold`, `--ink`, `--sand`...) |
| Textos de la página | `index.html` |

### Agregar un producto

```js
{ id: 'VE-204', cat: 'vestidos', catLabel: 'Vestidos',
  name: 'Vestido midi nuevo', price: '$28.000 por mayor',
  note: 'Tallas S – L' },
```

- `cat` debe coincidir con una clave de `ICONS` y de `GALLERY`.
- Para agregar una categoría nueva, añade su dibujo en `ICONS` y su degradado en `GALLERY`.

### Poner fotos reales de la ropa

Hoy las tarjetas usan un fondo degradado con un ícono de prenda (para que el sitio se vea bien
sin fotos). Para usar fotos, cambia en `productCard()`:

```js
<div class="prod__media">
  <img src="assets/img/ve-204.jpg" alt="${p.name}">
  ...
</div>
```

Y agrega en `styles.css`:

```css
.prod__media img{width:100%;height:100%;object-fit:cover}
```

Recomendado: fotos verticales 4:5, de buena luz, sin logos de terceros.

## Lo que incluye

- Botón de WhatsApp fijo en todas las páginas + botones por cada producto.
- Carrito de pedido: el cliente arma su selección y se la envía por WhatsApp ya ordenada.
- Filtros por categoría, favoritos, mapa de Google, formulario que arma el mensaje de WhatsApp.
- Datos de Google (JSON-LD `ClothingStore`) para aparecer mejor en Google y WhatsApp.
- Diseño responsive, accesible y sin dependencias externas (solo tipografías de Google).

## Pendiente de completar con datos reales

- **Precios**: el catálogo dice "Precio por mayor" porque no se proporcionaron. Ponlos en `PRODUCTS`.
- **Fotos reales** de la mercancía (ver arriba).
- **Link de las reseñas de Google** con el perfil real del negocio (en `index.html`, el botón
  "Ver reseñas en Google").
- **Instagram / redes sociales** si las tienen, para añadirlos en el footer.
