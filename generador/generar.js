/* =========================================================
   GENERADOR DEL SITIO SMESSENCE
   Ejecutar desde esta carpeta:  node generar.js
   Reconstruye la portada, las secciones, las 157 fichas,
   los packshots vectoriales y el índice de búsqueda.
   ========================================================= */
const fs = require('fs');
const path = require('path');
const { PERFUMES, COMBOS } = require('./datos.js');
const { frascoSVG } = require('./frascos.js');

const SALIDA = path.resolve(__dirname, '..');

/* ---------- Fotos reales aportadas por la tienda ----------
   Cualquier archivo en imagenes/productos/<id>.<ext> manda
   sobre la foto heredada y sobre el packshot vectorial.
   Ver imagenes/productos/LEEME.md
   ---------------------------------------------------------- */
const EXTENSIONES = ['.webp', '.png', '.jpg', '.jpeg'];
const DIR_FOTOS = path.join(SALIDA, 'imagenes', 'productos');

function fotoReal(id) {
  for (const ext of EXTENSIONES) {
    if (fs.existsSync(path.join(DIR_FOTOS, id + ext))) return 'productos/' + id + ext;
  }
  return null;
}

/* ---------- Altas del portal de gestión ----------
   Si existe datos-portal.js (el archivo que descarga
   pages/portal.html), sus fragancias se suman al catálogo.
   -------------------------------------------------- */
let DEL_PORTAL = [];
try {
  DEL_PORTAL = require('./datos-portal.js').NUEVOS || [];
  if (DEL_PORTAL.length) console.log('✔ ' + DEL_PORTAL.length + ' del portal de gestión');
} catch { /* no hay altas pendientes */ }

/* ---------- Catálogo normalizado ---------- */
const CATALOGO = [...PERFUMES, ...DEL_PORTAL].map(p => {
  const propia = fotoReal(p.id);
  const imgKey = propia || p.foto || ('frascos/' + p.id + '.svg');
  return { ...p, imgKey, vector: imgKey.startsWith('frascos/') };
});

const COMBOS_N = COMBOS.map(c => {
  const propia = fotoReal(c.id);
  return { ...c, imgKey: propia || c.foto, vector: false };
});

/* ---------- Utilidades ---------- */
const precioCOP = n => '$' + n.toLocaleString('es-CO') + ' COP';
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAtr = t => esc(t).replace(/"/g, '&quot;');
const escJS = t => String(t).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

// Todas las imágenes cuelgan de imagenes/ en la raíz del sitio
const imgSrc = (key, base) => `${base}imagenes/${key}`;

const ETIQUETA_TIPO = { nicho: 'Nicho', arabe: 'Árabe', disenador: 'Diseñador' };
const ETIQUETA_GENERO = { m: 'Masculino', f: 'Femenino', u: 'Unisex' };

const FUENTES = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap';

/* ---------- Bloques comunes ---------- */
function cabecera(titulo, base, descripcion) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(titulo)}</title>
    <meta name="description" content="${escAtr(descripcion || 'Smessence — perfumería de autor: fragancias originales de diseñador, árabes y de nicho.')}">
    <script>document.documentElement.dataset.tema = localStorage.getItem('tema') || 'claro';</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${FUENTES}" rel="stylesheet">
    <link rel="stylesheet" href="${base}css/estilo.css">
</head>
<body>
<a class="salto-contenido" href="#contenido">Ir al contenido</a>`;
}

function navegacion(base, activo) {
  const item = (href, texto, clave) =>
    `            <a href="${base}${href}"${activo === clave ? ' class="activo" aria-current="page"' : ''}>${texto}</a>`;
  return `    <header class="cabecera">
        <a class="cabecera__marca" href="${base}index.html">
            <span class="cabecera__logo">Smessence</span>
            <span class="cabecera__lema">Perfumería de autor</span>
        </a>
    </header>
    <div class="barra-nav">
        <div class="barra-nav__interior contenedor">
            <nav class="nav" aria-label="Navegación principal">
${item('index.html', 'Inicio', 'inicio')}
${item('pages/masculinas.html', 'Masculinas', 'masculinas')}
${item('pages/femeninas.html', 'Femeninas', 'femeninas')}
${item('pages/combos.html', 'Combos', 'combos')}
            </nav>
            <div class="buscador" role="search">
                <label class="buscador__campo">
                    <span class="visualmente-oculto">Buscar perfume por nombre, marca o nota</span>
                    <svg class="buscador__lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
                    <input type="search" id="buscador-entrada" placeholder="Buscar perfume…"
                           autocomplete="off" role="combobox" aria-expanded="false"
                           aria-controls="buscador-resultados" aria-autocomplete="list">
                    <button type="button" class="buscador__limpiar" aria-label="Limpiar búsqueda" hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </label>
                <div class="buscador__panel" id="buscador-resultados" role="listbox" hidden></div>
            </div>
        </div>
    </div>`;
}

function pie(base) {
  return `    <footer class="pie">
        <div class="pie__grid contenedor">
            <div>
                <p class="pie__logo">Smessence</p>
                <p class="pie__lema">El arte de dejar huella.</p>
                <p class="pie__texto">Fragancias originales seleccionadas con criterio de perfumería. Envíos a toda Colombia.</p>
            </div>
            <nav aria-label="Catálogo">
                <h2 class="pie__titulo">Catálogo</h2>
                <a href="${base}pages/masculinas.html">Masculinas</a>
                <a href="${base}pages/femeninas.html">Femeninas</a>
                <a href="${base}pages/combos.html">Combos</a>
            </nav>
            <nav aria-label="Colecciones">
                <h2 class="pie__titulo">Colecciones</h2>
                <a href="${base}pages/arabes.html">Perfumería árabe</a>
                <a href="${base}pages/nicho.html">Alta perfumería de nicho</a>
                <a href="${base}index.html#novedades">Novedades</a>
            </nav>
            <div>
                <h2 class="pie__titulo">Asesoría</h2>
                <p class="pie__texto">¿No sabes cuál elegir? Cuéntanos qué usas hoy y te recomendamos tu próxima firma olfativa.</p>
            </div>
        </div>
        <p class="pie__copy">&copy; ${new Date().getFullYear()} Smessence · Andrés Madrid · Todos los derechos reservados<a class="pie__portal" href="${base}pages/portal.html" title="Gestión de catálogo" aria-label="Gestión de catálogo">·</a></p>
    </footer>`;
}

function scripts(base) {
  return `    <script>window.RUTA_BASE = '${base}';</script>
    <script src="${base}js/indice.js"></script>
    <script src="${base}js/carrito.js"></script>
    <script src="${base}js/app.js"></script>
</body>
</html>
`;
}

/* ---------- Tarjeta de producto ---------- */
function tarjeta(p, base, { oculto = false, combo = false } = {}) {
  const href = `${base}pages/producto/${p.id}.html`;
  const src = imgSrc(p.imgKey, base);
  const supra = combo ? 'Combo exclusivo' : p.marca;
  const insignias = combo
    ? '<span class="insignia insignia--combo">Combo</span>'
    : `<span class="insignia">${ETIQUETA_TIPO[p.tipo] || ''}</span>` +
      (p.genero === 'u' ? '<span class="insignia insignia--tenue">Unisex</span>' : '');
  const datos = combo ? '' : ` data-tipo="${p.tipo}"`;

  return `                <article class="tarjeta revelar${oculto ? ' oculto' : ''}"${datos}>
                    <a class="tarjeta__enlace" href="${href}">
                        <div class="tarjeta__marco">
                            <div class="tarjeta__insignias">${insignias}</div>
                            <img class="tarjeta__imagen${p.vector ? ' es-vector' : ''}" src="${src}" alt="${escAtr(p.nombre)}" loading="lazy" decoding="async">
                        </div>
                        <div class="tarjeta__info">
                            <p class="tarjeta__marca">${esc(supra)}</p>
                            <p class="tarjeta__nombre">${esc(combo ? p.titulo : p.nombre)}</p>
                            <p class="tarjeta__precio">${precioCOP(p.precio)}</p>
                        </div>
                    </a>
                    <button class="btn-agregar" onclick="agregarAlCarrito('${escJS(combo ? p.titulo : p.nombre)}', ${p.precio}, '${escJS(p.imgKey)}')">
                        Agregar al carrito
                    </button>
                </article>`;
}

function encabezado(kicker, titulo, sub, extra = '') {
  return `        <header class="encabezado revelar">
            <p class="encabezado__kicker">${esc(kicker)}</p>
            <h2 class="encabezado__titulo">${esc(titulo)}</h2>
            <div class="encabezado__filete" aria-hidden="true"></div>
            ${sub ? `<p class="encabezado__sub">${esc(sub)}</p>` : ''}
            ${extra}
        </header>`;
}

function filtros() {
  return `        <div class="filtros revelar" role="group" aria-label="Filtrar por tipo de perfumería">
            <button class="filtro activo" data-filtro="todos">Todos</button>
            <button class="filtro" data-filtro="nicho">Nicho</button>
            <button class="filtro" data-filtro="arabe">Árabes</button>
            <button class="filtro" data-filtro="disenador">Diseñador</button>
        </div>
        <p class="filtros-vacio" hidden>Ninguna fragancia coincide con esta combinación de filtros.</p>`;
}

/* =========================================================
   PORTADA
   ========================================================= */
const DIAPOSITIVAS = [
  {
    img: 'Bodegon_Vogue_4_202.jpg', kicker: 'Perfumería Smessence',
    titulo: 'El arte de dejar huella',
    texto: 'Fragancias originales seleccionadas una por una: diseñador, perfumería árabe y nicho.',
    cta: 'Ver la colección', href: '#catalogo',
    alt: 'Bodegón editorial de frascos de perfume de nicho sobre piedra y madera'
  },
  {
    img: 'prehome-fathers-day-2-.jpg', kicker: 'Casa Jean Paul Gaultier',
    titulo: 'Íconos que nunca fallan',
    texto: 'De Le Male Le Parfum a Scandal: los clásicos más halagados de la perfumería moderna.',
    cta: 'Explorar masculinas', href: 'pages/masculinas.html',
    alt: 'Perfumes masculinos de Jean Paul Gaultier: Scandal, Le Beau y Le Male'
  },
  {
    img: 'perfumes.r_d.1669-1439.jpg', kicker: 'Colección femenina',
    titulo: 'Esencias con carácter',
    texto: 'Florales, gourmand y chipres: encuentra la firma olfativa que te represente.',
    cta: 'Explorar femeninas', href: 'pages/femeninas.html',
    alt: 'Frascos clásicos de perfume en tonos ámbar sobre una mesa'
  },
  {
    img: 'mejores-perfumes-hombre-incienso-65b3925a1ea14.jpg', kicker: 'Perfumería árabe',
    titulo: 'Oud, ámbar y azafrán',
    texto: 'Lattafa, Afnan, Armaf y Rasasi: proyección extrema a precio sensato.',
    cta: 'Ver árabes', href: 'pages/arabes.html',
    alt: 'Selección de perfumes premium sobre arena al atardecer'
  },
  {
    img: 'mejores-perfumes-citricos-para-hombre-649ea676714cf.jpg', kicker: 'Alta perfumería',
    titulo: 'La sección de nicho',
    texto: 'Creed, Maison Francis Kurkdjian, Xerjoff, Initio y Parfums de Marly.',
    cta: 'Descubrir nicho', href: 'pages/nicho.html',
    alt: 'Frascos de perfumería cítrica de alta gama sobre fondo claro'
  }
];

const GUIA = [
  {
    t: 'Dónde aplicar',
    d: 'Vaporiza sobre piel limpia e hidratada en los puntos de pulso: cuello, detrás de las orejas y muñecas. No frotes las muñecas — rompe las notas de salida y acorta la duración.'
  },
  {
    t: 'Cómo elegir',
    d: 'Los frescos cítricos y acuáticos rinden mejor de día y en calor; los ámbar, oud y gourmand se expresan de noche y en clima frío. Prueba siempre sobre piel, nunca solo en papel.'
  },
  {
    t: 'Cómo conservar',
    d: 'Guarda los frascos lejos de la luz directa, el calor y la humedad del baño. En su caja y a temperatura estable, una fragancia mantiene su perfil intacto durante años.'
  }
];

function portada() {
  const base = '';
  const destacados = CATALOGO.filter(p => p.destacado);
  const visibles = 12;
  const catalogo = CATALOGO.map((p, i) => tarjeta(p, base, { oculto: i >= visibles })).join('\n');
  const marcas = [...new Set(CATALOGO.map(p => p.marca))];

  const slides = DIAPOSITIVAS.map((s, i) => `            <article class="diapositiva${i === 0 ? ' activa' : ''}">
                <img src="${base}imagenes/${s.img}" alt="${escAtr(s.alt)}"${i === 0 ? '' : ' loading="lazy"'} decoding="async">
                <div class="diapositiva__velo" aria-hidden="true"></div>
                <div class="diapositiva__texto">
                    <p class="diapositiva__kicker">${esc(s.kicker)}</p>
                    <h2 class="diapositiva__titulo">${esc(s.titulo)}</h2>
                    <p class="diapositiva__bajada">${esc(s.texto)}</p>
                    <a class="diapositiva__cta" href="${base}${s.href}">${esc(s.cta)}</a>
                </div>
            </article>`).join('\n');

  return `${cabecera('Smessence | Perfumería de autor', base, `Perfumería en línea: ${CATALOGO.length} fragancias originales de diseñador, árabes y de nicho, con envío a toda Colombia.`)}
${navegacion(base, 'inicio')}

    <section class="portada-hero" aria-roledescription="carrusel" aria-label="Colecciones destacadas">
        <div class="portada-hero__pista">
${slides}
        </div>
        <button class="hero-flecha hero-flecha--prev" aria-label="Diapositiva anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="hero-flecha hero-flecha--next" aria-label="Diapositiva siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="hero-puntos" role="tablist" aria-label="Seleccionar diapositiva"></div>
    </section>

    <main id="contenido">
        <section class="seccion seccion--ancha" id="novedades">
            <div class="contenedor">
${encabezado('Recién llegados', 'Novedades de la casa', 'Las incorporaciones más recientes al catálogo Smessence.')}
            </div>
            <div class="riel-envoltura contenedor">
                <button class="riel-flecha riel-flecha--prev" aria-label="Anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div class="riel" tabindex="0" aria-label="Carrusel de novedades">
${destacados.map(p => tarjeta(p, base)).join('\n')}
                </div>
                <button class="riel-flecha riel-flecha--next" aria-label="Siguiente">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>
        </section>

        <section class="marquesina" aria-label="Casas perfumistas disponibles">
            <div class="marquesina__pista">
                ${[...marcas, ...marcas].map(m => `<span>${esc(m)}</span>`).join('\n                ')}
            </div>
        </section>

        <section class="seccion contenedor">
${encabezado('Selección del perfumista', 'La firma de la casa', '')}
            <div class="editorial revelar">
                <div class="editorial__visual">
                    <img src="${base}imagenes/frascos/br540.svg" alt="Baccarat Rouge 540 de Maison Francis Kurkdjian" loading="lazy" decoding="async">
                </div>
                <div class="editorial__texto">
                    <p class="editorial__kicker">Maison Francis Kurkdjian</p>
                    <h3 class="editorial__titulo">Baccarat Rouge 540</h3>
                    <p>Si una sola fragancia define la última década, es esta. Azafrán y jazmín sobre ámbar gris y cedro construyen un aroma luminoso, casi mineral, con una firma dulce-salada que no se parece a nada.</p>
                    <p>Es un extrait: dos vaporizaciones bastan para que la estela acompañe durante todo el día. Unisex, adictivo y objeto de deseo absoluto.</p>
                    <div class="editorial__acciones">
                        <a class="btn-solido" href="${base}pages/producto/br540.html">Ver la ficha completa</a>
                        <span class="editorial__precio">${precioCOP(CATALOGO.find(p => p.id === 'br540').precio)}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="seccion contenedor" id="catalogo">
${encabezado('Catálogo completo', 'Nuestras fragancias', `${CATALOGO.length} fragancias originales entre diseñador, perfumería árabe y nicho.`)}
${filtros()}
            <div class="rejilla">
${catalogo}
            </div>
            <button id="ver-mas">Ver el catálogo completo</button>
        </section>

        <section class="seccion contenedor" id="combos">
${encabezado('Ahorra en grande', 'Combos exclusivos', 'Tríos y cuartetos seleccionados para cubrir día, noche y ocasión especial.')}
            <div class="combos">
${COMBOS_N.map(c => `                <article class="combo revelar">
                    <a class="combo__visual" href="${base}pages/producto/${c.id}.html">
                        <img src="${imgSrc(c.imgKey, base)}" alt="${escAtr(c.nombre)}" loading="lazy" decoding="async">
                    </a>
                    <div class="combo__texto">
                        <p class="combo__kicker">Combo exclusivo</p>
                        <h3 class="combo__titulo"><a href="${base}pages/producto/${c.id}.html">${esc(c.titulo)}</a></h3>
                        <p class="combo__lista">${esc(c.nombre)}</p>
                        <div class="combo__pie">
                            <span class="combo__precio">${precioCOP(c.precio)}</span>
                            <button class="btn-agregar btn-agregar--compacto" onclick="agregarAlCarrito('${escJS(c.titulo)}', ${c.precio}, '${escJS(c.imgKey)}')">Agregar</button>
                        </div>
                    </div>
                </article>`).join('\n')}
            </div>
        </section>

        <section class="seccion contenedor">
${encabezado('Guía Smessence', 'Cómo sacarle todo a tu perfume', '')}
            <div class="guia">
${GUIA.map((g, i) => `                <article class="guia__ficha revelar">
                    <span class="guia__numero">0${i + 1}</span>
                    <h3 class="guia__titulo">${esc(g.t)}</h3>
                    <p>${esc(g.d)}</p>
                </article>`).join('\n')}
            </div>
        </section>
    </main>

${pie(base)}
${scripts(base)}`;
}

/* =========================================================
   PÁGINA DE CATEGORÍA
   ========================================================= */
function categoria({ clave, titulo, kicker, sub, items, combos = false }) {
  const base = '../';
  return `${cabecera(`${titulo} | Smessence`, base, sub)}
${navegacion(base, clave)}

    <main id="contenido" class="contenedor seccion">
        <header class="encabezado encabezado--pagina revelar">
            <p class="encabezado__kicker">${esc(kicker)}</p>
            <h1 class="encabezado__titulo">${esc(titulo)}</h1>
            <div class="encabezado__filete" aria-hidden="true"></div>
            <p class="encabezado__sub">${esc(sub)}</p>
        </header>
        <p class="conteo">${items.length} ${items.length === 1 ? 'referencia' : 'referencias'} disponibles</p>
${combos ? '' : filtros()}
        <div class="rejilla">
${items.map(p => tarjeta(p, base, { combo: combos })).join('\n')}
        </div>
    </main>

${pie(base)}
${scripts(base)}`;
}

/* =========================================================
   FICHA DE PRODUCTO
   ========================================================= */
function fichaPerfume(p) {
  const base = '../../';
  const catClave = p.tipo === 'nicho' ? 'nicho' : p.tipo === 'arabe' ? 'arabe' : (p.genero === 'f' ? 'femeninas' : 'masculinas');
  const catHref = p.tipo === 'nicho' ? 'nicho.html' : p.tipo === 'arabe' ? 'arabes.html' : (p.genero === 'f' ? 'femeninas.html' : 'masculinas.html');
  const catNombre = p.tipo === 'nicho' ? 'Nicho' : p.tipo === 'arabe' ? 'Árabes' : (p.genero === 'f' ? 'Femeninas' : 'Masculinas');

  // Sugerencias: mismo tipo de perfumería, público compatible
  const relacionados = CATALOGO
    .filter(o => o.id !== p.id && o.tipo === p.tipo && (o.genero === p.genero || o.genero === 'u' || p.genero === 'u'))
    .slice(0, 4);

  return `${cabecera(`${p.nombre} — ${p.marca} | Smessence`, base, `${p.nombre} de ${p.marca}: ${p.familia}. ${p.desc[0].slice(0, 110)}…`)}
${navegacion(base, catClave)}

    <main id="contenido" class="contenedor seccion">
        <nav class="miga" aria-label="Miga de pan">
            <a href="${base}index.html">Inicio</a><span aria-hidden="true">/</span>
            <a href="${base}pages/${catHref}">${catNombre}</a><span aria-hidden="true">/</span>
            <span>${esc(p.nombre)}</span>
        </nav>

        <div class="ficha">
            <div class="ficha__visual revelar">
                <img class="${p.vector ? 'es-vector' : ''}" src="${imgSrc(p.imgKey, base)}" alt="Frasco de ${escAtr(p.nombre)} de ${escAtr(p.marca)}" decoding="async">
            </div>
            <div class="ficha__texto revelar">
                <div class="ficha__insignias">
                    <span class="insignia">${ETIQUETA_TIPO[p.tipo] || ''}</span>
                    <span class="insignia insignia--tenue">${ETIQUETA_GENERO[p.genero]}</span>
                </div>
                <p class="ficha__marca">${esc(p.marca)}</p>
                <h1 class="ficha__titulo">${esc(p.nombre)}</h1>
                <p class="ficha__familia">${esc(p.familia)}</p>
                <p class="ficha__precio">${precioCOP(p.precio)}</p>
${p.desc.map(t => `                <p class="ficha__desc">${esc(t)}</p>`).join('\n')}

                <div class="piramide">
${[['Salida', p.notas.salida], ['Corazón', p.notas.corazon], ['Fondo', p.notas.fondo]].map(([n, v]) =>
`                    <div class="piramide__nivel">
                        <h2>${n}</h2>
                        <p>${esc(v)}</p>
                    </div>`).join('\n')}
                </div>

                <dl class="ficha__meta">
                    <div><dt>Ocasión</dt><dd>${esc(p.ocasion)}</dd></div>
                    <div><dt>Duración</dt><dd>${esc(p.duracion)}</dd></div>
                </dl>

                <button class="btn-agregar" onclick="agregarAlCarrito('${escJS(p.nombre)}', ${p.precio}, '${escJS(p.imgKey)}')">
                    Agregar al carrito — ${precioCOP(p.precio)}
                </button>
            </div>
        </div>

${relacionados.length ? `        <section class="seccion">
${encabezado('También te puede gustar', 'Fragancias afines', '')}
            <div class="rejilla rejilla--compacta">
${relacionados.map(o => tarjeta(o, base)).join('\n')}
            </div>
        </section>` : ''}
    </main>

${pie(base)}
${scripts(base)}`;
}

function fichaCombo(c) {
  const base = '../../';
  return `${cabecera(`${c.titulo} | Smessence`, base, `${c.titulo}: ${c.nombre}. ${c.desc[0].slice(0, 110)}…`)}
${navegacion(base, 'combos')}

    <main id="contenido" class="contenedor seccion">
        <nav class="miga" aria-label="Miga de pan">
            <a href="${base}index.html">Inicio</a><span aria-hidden="true">/</span>
            <a href="${base}pages/combos.html">Combos</a><span aria-hidden="true">/</span>
            <span>${esc(c.titulo)}</span>
        </nav>

        <div class="ficha">
            <div class="ficha__visual revelar">
                <img src="${imgSrc(c.imgKey, base)}" alt="${escAtr(c.nombre)}" decoding="async">
            </div>
            <div class="ficha__texto revelar">
                <div class="ficha__insignias"><span class="insignia insignia--combo">Combo</span></div>
                <p class="ficha__marca">Combo exclusivo</p>
                <h1 class="ficha__titulo">${esc(c.titulo)}</h1>
                <p class="ficha__familia">${esc(c.nombre)}</p>
                <p class="ficha__precio">${precioCOP(c.precio)}</p>
${c.desc.map(t => `                <p class="ficha__desc">${esc(t)}</p>`).join('\n')}

                <div class="incluye">
                    <h2>Qué incluye</h2>
                    <ul>
${c.incluye.map(([n, d]) => `                        <li><strong>${esc(n)}</strong><span>${esc(d)}</span></li>`).join('\n')}
                    </ul>
                </div>

                <dl class="ficha__meta">
                    <div><dt>Ideal para</dt><dd>${esc(c.ideal)}</dd></div>
                    <div><dt>Presentación</dt><dd>Fragancias originales selladas de 100 ml.</dd></div>
                </dl>

                <button class="btn-agregar" onclick="agregarAlCarrito('${escJS(c.titulo)}', ${c.precio}, '${escJS(c.imgKey)}')">
                    Agregar al carrito — ${precioCOP(c.precio)}
                </button>
            </div>
        </div>
    </main>

${pie(base)}
${scripts(base)}`;
}

/* =========================================================
   ESCRITURA
   ========================================================= */
const escribir = (rel, contenido) => {
  const destino = path.join(SALIDA, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, contenido, 'utf8');
};

// Packshots vectoriales: solo para quien no tiene fotografía
let n = 0;
CATALOGO.filter(p => p.frasco && p.vector).forEach(p => {
  escribir(path.join('imagenes', 'frascos', p.id + '.svg'), frascoSVG(p.frasco, p));
  n++;
});
console.log('✔ ' + n + ' packshots vectoriales');

// Índice de búsqueda: se sirve como JS para que funcione también con file://
const indice = [
  ...CATALOGO.map(p => ({
    n: p.nombre, m: p.marca, t: p.tipo, g: p.genero, p: p.precio,
    i: p.imgKey, u: 'pages/producto/' + p.id + '.html',
    // Notas de la pirámide: permiten buscar por ingrediente ("azafrán", "vainilla")
    k: [p.familia, p.notas.salida, p.notas.corazon, p.notas.fondo].join(', ')
  })),
  ...COMBOS_N.map(c => ({
    n: c.titulo, m: 'Combo exclusivo', t: 'combo', g: 'u', p: c.precio,
    i: c.imgKey, u: 'pages/producto/' + c.id + '.html',
    k: c.nombre
  }))
];
escribir(path.join('js', 'indice.js'),
  '/* Índice de búsqueda generado automáticamente. No editar a mano. */\n' +
  'window.INDICE_PERFUMES = ' + JSON.stringify(indice) + ';\n');
console.log('✔ índice de búsqueda (' + indice.length + ' entradas)');

// Fichas
CATALOGO.forEach(p => escribir(path.join('pages', 'producto', p.id + '.html'), fichaPerfume(p)));
COMBOS_N.forEach(c => escribir(path.join('pages', 'producto', c.id + '.html'), fichaCombo(c)));
console.log('✔ ' + (CATALOGO.length + COMBOS_N.length) + ' fichas de producto');

// Categorías
escribir(path.join('pages', 'masculinas.html'), categoria({
  clave: 'masculinas', titulo: 'Perfumes Masculinos', kicker: 'Colección masculina',
  sub: 'Frescos, especiados, amaderados y orientales con presencia.',
  items: CATALOGO.filter(p => p.genero === 'm' || p.genero === 'u')
}));
escribir(path.join('pages', 'femeninas.html'), categoria({
  clave: 'femeninas', titulo: 'Fragancias Femeninas', kicker: 'Colección femenina',
  sub: 'Florales, gourmand y chipres para cada momento del día.',
  items: CATALOGO.filter(p => p.genero === 'f' || p.genero === 'u')
}));
escribir(path.join('pages', 'arabes.html'), categoria({
  clave: 'arabes', titulo: 'Perfumería Árabe', kicker: 'Oud, ámbar y azafrán',
  sub: 'Lattafa, Afnan, Armaf, Rasasi y Al Haramain: proyección extrema a precio sensato.',
  items: CATALOGO.filter(p => p.tipo === 'arabe')
}));
escribir(path.join('pages', 'nicho.html'), categoria({
  clave: 'nicho', titulo: 'Alta Perfumería de Nicho', kicker: 'Casas de autor',
  sub: 'Creed, Maison Francis Kurkdjian, Xerjoff, Initio, Parfums de Marly y Le Labo.',
  items: CATALOGO.filter(p => p.tipo === 'nicho')
}));
escribir(path.join('pages', 'combos.html'), categoria({
  clave: 'combos', titulo: 'Combos Exclusivos', kicker: 'Ahorra en grande',
  sub: 'Tríos y cuartetos de fragancias originales a precio especial.',
  items: COMBOS_N, combos: true
}));
console.log('✔ 5 páginas de categoría');

escribir('index.html', portada());
console.log('✔ portada');

console.log(`\nCatálogo: ${CATALOGO.length} perfumes (${CATALOGO.filter(p => !p.vector).length} con foto + ${CATALOGO.filter(p => p.vector).length} con packshot) + ${COMBOS_N.length} combos.`);
