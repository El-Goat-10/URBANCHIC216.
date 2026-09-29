/* =========================================================
   URBANCHIC216 — lógica del sitio
   ========================================================= */
(function () {
  'use strict';

  const WHATSAPP = '573104149594';
  const STORE_KEY = 'urbanchic216:order:v1';
  const FAV_KEY = 'urbanchic216:favs:v1';

  const waLink = (msg) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  /* ---------------- Catálogo ---------------- */
  // Ajusta precios, referencias y fotos a tu inventario real.
  const ICONS = {
    maiseco: '<path d="M40 20 L50 26 L60 20 L70 38 L61 44 L60 86 L40 86 L39 44 L30 38 Z"/><path d="M40 52 h20"/><path d="M44 20 L50 30 L56 20"/>',
    vestidos: '<path d="M42 18 L50 24 L58 18 L66 40 L58 46 L58 86 L42 86 L42 46 L34 40 Z"/><path d="M42 56 h16"/><path d="M42 18 L46 30 M58 18 L54 30"/>',
    blusas: '<path d="M36 24 L46 18 L50 26 L54 18 L64 24 L74 38 L63 46 L61 40 L61 84 L39 84 L39 40 L37 46 L26 38 Z"/>',
    pantalones: '<path d="M37 20 L63 20 L69 52 L63 88 L54 88 L50 58 L46 88 L37 88 L31 52 Z"/><path d="M37 32 h26"/>',
    conjuntos: '<path d="M34 22 L42 18 L46 24 L42 40 L38 44 L38 54 L30 50 L28 36 Z"/><path d="M56 22 L64 18 L68 24 L64 40 L60 44 L60 54 L52 50 L50 36 Z"/><path d="M34 60 L44 58 L48 64 L44 88 L36 88 Z"/><path d="M56 60 L66 58 L64 88 L56 88 L52 64 Z"/>',
    abrigos: '<path d="M38 20 L46 16 L50 28 L54 16 L62 20 L70 32 L60 40 L60 88 L40 88 L40 40 L30 32 Z"/><path d="M50 28 L50 88"/>',
    accesorios: '<path d="M28 40 h44 v38 h-44 z"/><path d="M40 40 a10 13 0 0 1 20 0"/>'
  };

  const PRODUCTS = [
    { id: 'MS-101', cat: 'maiseco', catLabel: 'Maiseco', name: 'Maiseco basic algodón', price: 'Precio por mayor', note: 'Tallas S – XXL', flag: 'Más pedido' },
    { id: 'MS-102', cat: 'maiseco', catLabel: 'Maiseco', name: 'Maiseco elasticado', price: 'Precio por mayor', note: 'Tallas S – XXL' },
    { id: 'MS-103', cat: 'maiseco', catLabel: 'Maiseco', name: 'Maiseco rib 1x1', price: 'Precio por mayor', note: 'Tallas S – XL', flag: 'Nuevo' },
    { id: 'MS-104', cat: 'maiseco', catLabel: 'Maiseco', name: 'Maiseco neonatal', price: 'Precio por mayor', note: '0 – 12 meses' },

    { id: 'VE-201', cat: 'vestidos', catLabel: 'Vestidos', name: 'Vestido midi floral', price: 'Precio por mayor', note: 'Tallas S – L', flag: 'Nuevo' },
    { id: 'VE-202', cat: 'vestidos', catLabel: 'Vestidos', name: 'Vestido midi liso', price: 'Precio por mayor', note: 'Tallas S – XL' },
    { id: 'VE-203', cat: 'vestidos', catLabel: 'Vestidos', name: 'Vestido print palabra', price: 'Precio por mayor', note: 'Tallas S – M' },

    { id: 'BL-301', cat: 'blusas', catLabel: 'Blusas', name: 'Blusa manga corta satinada', price: 'Precio por mayor', note: 'Tallas S – L', flag: 'Más pedido' },
    { id: 'BL-302', cat: 'blusas', catLabel: 'Blusas', name: 'Blusa draped', price: 'Precio por mayor', note: 'Tallas S – M' },
    { id: 'BL-303', cat: 'blusas', catLabel: 'Blusas', name: 'Camisa oversize', price: 'Precio por mayor', note: 'Tallas S – XXL' },

    { id: 'PA-401', cat: 'pantalones', catLabel: 'Pantalones', name: 'Pantalón palazzo', price: 'Precio por mayor', note: 'Tallas 6 – 16' },
    { id: 'PA-402', cat: 'pantalones', catLabel: 'Pantalones', name: 'Pantalón recto high waist', price: 'Precio por mayor', note: 'Tallas S – XL', flag: 'Nuevo' },
    { id: 'PA-403', cat: 'pantalones', catLabel: 'Pantalones', name: 'Jean mom recto', price: 'Precio por mayor', note: 'Tallas 6 – 16' },

    { id: 'CJ-501', cat: 'conjuntos', catLabel: 'Conjuntos', name: 'Conjunto crop + pantalón', price: 'Precio por mayor', note: 'Tallas S – M' },
    { id: 'CJ-502', cat: 'conjuntos', catLabel: 'Conjuntos', name: 'Conjunto blazer + pantalón', price: 'Precio por mayor', note: 'Tallas S – L' },

    { id: 'AB-601', cat: 'abrigos', catLabel: 'Abrigos', name: 'Blazer básico', price: 'Precio por mayor', note: 'Tallas S – L' },
    { id: 'AB-602', cat: 'abrigos', catLabel: 'Abrigos', name: 'Chaqueta biker', price: 'Precio por mayor', note: 'Tallas S – M' },

    { id: 'AC-701', cat: 'accesorios', catLabel: 'Accesorios', name: 'Bolso tote', price: 'Precio por mayor', note: 'Unidad / paquete' },
    { id: 'AC-702', cat: 'accesorios', catLabel: 'Accesorios', name: 'Cinturón cuero sintético', price: 'Precio por mayor', note: 'Tallas S – L' }
  ];

  const GALLERY = {
    maiseco:   ['#2a2a31', '#3d3d48'],
    vestidos:  ['#7c3c5c', '#43182f'],
    blusas:    ['#2c5468', '#12303f'],
    pantalones:['#5c4b31', '#33291a'],
    conjuntos: ['#6b3f3f', '#361c1c'],
    abrigos:   ['#26262e', '#3f3f4b'],
    accesorios:['#5b4f2c', '#38301a']
  };

  const svgIcon = (cat) =>
    `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.4"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[cat] || ICONS.blusas}</svg>`;

  const waIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 5.82 2.42 8.17 8.17 0 0 1 2.41 5.82c-.01 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31Z"/></svg>`;

  const heartIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z"/></svg>`;
  const plusIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  /* ---------------- Estado (pedido y favoritos) ---------------- */
  const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* modo privado */ }
  };

  let order = load(STORE_KEY, {});
  let favs = load(FAV_KEY, []);

  const totalUnits = () => Object.values(order).reduce((a, b) => a + b, 0);

  const syncCount = () => {
    const el = document.getElementById('cartCount');
    if (el) el.textContent = String(totalUnits());
  };

  /* ---------------- Render del catálogo ---------------- */
  const grid = document.getElementById('catalogGrid');

  const productCard = (p) => {
    const [c1, c2] = GALLERY[p.cat] || GALLERY.blusas;
    const isFav = favs.includes(p.id);
    const qty = order[p.id] || 0;
    return `
      <article class="prod" data-cat="${p.cat}" data-id="${p.id}">
        <div class="prod__media" style="background:linear-gradient(150deg,${c1},${c2})">
          ${p.flag ? `<span class="prod__flag">${p.flag}</span>` : ''}
          <span class="prod__tag">${p.catLabel}</span>
          <button class="prod__wish${isFav ? ' is-on' : ''}" type="button" data-fav="${p.id}"
                  aria-label="Guardar ${p.name} en favoritos" aria-pressed="${isFav}">${heartIcon}</button>
          ${svgIcon(p.cat)}
        </div>
        <div class="prod__body">
          <h3 class="prod__name">${p.name}</h3>
          <p class="prod__ref">Ref. ${p.id} · ${p.note}</p>
          <div class="prod__foot">
            <p class="prod__price">${p.price}<small>Consultar por lote</small></p>
            <div class="prod__btns">
              <button class="mini mini--add${qty ? ' is-added' : ''}" type="button" data-add="${p.id}"
                      aria-label="Agregar ${p.name} al pedido" title="Agregar al pedido">${qty ? checkIcon : plusIcon}</button>
              <a class="mini mini--wa" target="_blank" rel="noopener"
                 href="${waLink(`Hola URBANCHIC216, quiero información de la referencia ${p.id} (${p.name}) — precio por mayor, talles y colores disponibles.`)}"
                 aria-label="Consultar por WhatsApp" title="Consultar por WhatsApp">${waIcon}</a>
            </div>
          </div>
        </div>
      </article>`;
  };

  const render = (filter = 'todos') => {
    if (!grid) return;
    const list = filter === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
    grid.innerHTML = list.length
      ? list.map(productCard).join('')
      : '<p class="empty">No hay productos en esta categoría por ahora. Escríbenos y te enviamos lo que tenemos.</p>';
  };

  /* ---------------- Filtros ---------------- */
  document.querySelectorAll('.chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-filter]').forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      render(chip.dataset.filter);
    });
  });

  /* ---------------- Acciones de tarjeta ---------------- */
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      const id = addBtn.dataset.add;
      order[id] = (order[id] || 0) + 1;
      save(STORE_KEY, order);
      addBtn.classList.add('is-added');
      addBtn.innerHTML = checkIcon;
      syncCount();
      renderDrawer();
      return;
    }

    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      const id = favBtn.dataset.fav;
      favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
      save(FAV_KEY, favs);
      favBtn.classList.toggle('is-on', favs.includes(id));
      favBtn.setAttribute('aria-pressed', String(favs.includes(id)));
    }
  });

  /* ---------------- Drawer del pedido ---------------- */
  const drawer = document.getElementById('drawer');
  const drawerBody = document.getElementById('drawerBody');
  let lastFocused = null;

  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  const renderDrawer = () => {
    if (!drawerBody) return;
    const ids = Object.keys(order).filter((id) => order[id] > 0);

    if (!ids.length) {
      drawerBody.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
          <p>Tu pedido está vacío.</p>
          <p style="margin-top:.4rem;font-size:.86rem">Agrega modelos del catálogo y te los enviamos todos juntos por WhatsApp.</p>
        </div>`;
      return;
    }

    drawerBody.innerHTML = ids.map((id) => {
      const p = productById(id);
      if (!p) return '';
      return `
        <div class="order-item">
          <div>
            <strong>${p.name}</strong>
            <small>Ref. ${p.id} · ${p.note}</small>
          </div>
          <div class="qty">
            <button type="button" data-dec="${id}" aria-label="Quitar una unidad">−</button>
            <span>${order[id]}</span>
            <button type="button" data-inc="${id}" aria-label="Agregar una unidad">+</button>
          </div>
        </div>`;
    }).join('') +
    `<p style="font-size:.8rem;color:var(--muted);text-align:center;margin-top:.5rem">
       Total: ${totalUnits()} unidades · el precio te lo confirmamos por WhatsApp
     </p>`;
  };

  const openDrawer = () => {
    renderDrawer();
    lastFocused = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    drawer.querySelector('.icon-btn').focus();
  };
  const closeDrawer = () => {
    drawer.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
  };

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openDrawer);
  document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (drawer && !drawer.hidden) closeDrawer();
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      burger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const id = (inc || dec)?.dataset.inc || (inc || dec)?.dataset.dec;
    if (!id) return;
    order[id] = Math.max(0, (order[id] || 0) + (inc ? 1 : -1));
    if (order[id] === 0) delete order[id];
    save(STORE_KEY, order);
    syncCount();
    renderDrawer();
    const card = grid && grid.querySelector(`[data-id="${id}"] [data-add]`);
    if (card) {
      const on = Boolean(order[id]);
      card.classList.toggle('is-added', on);
      card.innerHTML = on ? checkIcon : plusIcon;
    }
  });

  const clearBtn = document.getElementById('clearOrder');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    order = {};
    save(STORE_KEY, order);
    syncCount();
    renderDrawer();
    render(currentFilter());
    if (grid) {
      grid.querySelectorAll('.mini--add').forEach((b) => {
        b.classList.remove('is-added');
        b.innerHTML = plusIcon;
      });
    }
  });

  const sendOrder = document.getElementById('sendOrder');
  if (sendOrder) sendOrder.addEventListener('click', () => {
    const ids = Object.keys(order).filter((id) => order[id] > 0 && productById(id));
    if (!ids.length) return;
    const lines = ids.map((id, i) => {
      const p = productById(id);
      return `${i + 1}. ${p.name} (ref. ${p.id}) — ${order[id]} unidades`;
    });
    const msg =
      `Hola URBANCHIC216, quiero cotizar este pedido:\n\n${lines.join('\n')}\n\n` +
      `Total: ${totalUnits()} unidades.\n¿Me confirman precio por mayor, talles y colores disponibles?`;
    window.open(waLink(msg), '_blank', 'noopener');
  });

  const currentFilter = () => {
    const active = document.querySelector('.chip.is-active');
    return active ? active.dataset.filter : 'todos';
  };

  /* ---------------- Formulario → WhatsApp ---------------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = (data.get('nombre') || '').toString().trim();
      if (!nombre) {
        document.getElementById('nombre').focus();
        return;
      }
      const tel = (data.get('telefono') || '').toString().trim();
      const tipo = (data.get('tipo') || '').toString().trim();
      const cantidad = (data.get('cantidad') || '').toString().trim();
      const mensaje = (data.get('mensaje') || '').toString().trim();

      const msg = [
        `Hola URBANCHIC216, mi nombre es ${nombre}.`,
        tel ? `Mi número es ${tel}.` : '',
        tipo ? `Estoy buscando: ${tipo}.` : '',
        cantidad ? `Cantidad aproximada: ${cantidad}.` : '',
        mensaje ? `\n${mensaje}` : ''
      ].filter(Boolean).join(' ');

      window.open(waLink(msg), '_blank', 'noopener');
    });
  }

  /* ---------------- Header: sombra + menú móvil ---------------- */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');

  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-locked');
      }
    });
  }

  /* ---------------- Nav activa por scroll ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`)
        );
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- Animación al hacer scroll ---------------- */
  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        ro.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach((el) => ro.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------------- Año en el footer ---------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- Init ---------------- */
  render();
  syncCount();
  renderDrawer();
})();
