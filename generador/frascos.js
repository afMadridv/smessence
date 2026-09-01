/* =========================================================
   Packshots vectoriales de frascos.
   Vector = nítido a cualquier resolución y en pantallas retina.
   ========================================================= */

const METALES = {
  oro:   { c1: '#F2E3C0', c2: '#C9AE7F', c3: '#8A6B35' },
  plata: { c1: '#EFF2F4', c2: '#C4C8CC', c3: '#7E858C' },
  negro: { c1: '#4A4F55', c2: '#2A2E33', c3: '#111316' },
  rojo:  { c1: '#D9736A', c2: '#B23A3A', c3: '#6E1C1C' }
};

/* Silueta del cuerpo según la forma del frasco */
const CUERPOS = {
  rect: 'M132,196 H268 a14,14 0 0 1 14,14 V476 a14,14 0 0 1 -14,14 H132 a14,14 0 0 1 -14,-14 V210 a14,14 0 0 1 14,-14 Z',
  torre: 'M152,182 H248 a12,12 0 0 1 12,12 V478 a12,12 0 0 1 -12,12 H152 a12,12 0 0 1 -12,-12 V194 a12,12 0 0 1 12,-12 Z',
  flacon: 'M126,268 Q126,212 176,200 H224 Q274,212 274,268 V466 Q274,490 250,490 H150 Q126,490 126,466 Z',
  cofre: 'M104,272 H296 a16,16 0 0 1 16,16 V474 a16,16 0 0 1 -16,16 H104 a16,16 0 0 1 -16,-16 V288 a16,16 0 0 1 16,-16 Z',
  gota: 'M182,198 H218 C288,264 288,342 288,396 C288,454 249,491 200,491 C151,491 112,454 112,396 C112,342 112,264 182,198 Z',
  diamante: 'M170,202 H230 L286,268 V428 L200,492 L114,428 V268 Z',
  urna: 'M200,196 C258,196 282,244 282,300 C282,344 262,368 262,404 C262,446 276,462 276,476 a14,14 0 0 1 -14,14 H138 a14,14 0 0 1 -14,-14 C124,462 138,446 138,404 C138,368 118,344 118,300 C118,244 142,196 200,196 Z',
  anfora: 'M200,190 C264,190 290,250 290,318 C290,392 252,432 252,462 a28,28 0 0 1 -28,28 H176 a28,28 0 0 1 -28,-28 C148,432 110,392 110,318 C110,250 136,190 200,190 Z',
  redondo: 'M200,238 a126,126 0 1 1 -0.1,0 Z',
  trofeo: 'M142,222 H258 L250,380 Q244,438 200,470 Q156,438 150,380 Z',
  plano: 'M168,178 H232 a10,10 0 0 1 10,10 V480 a10,10 0 0 1 -10,10 H168 a10,10 0 0 1 -10,-10 V188 a10,10 0 0 1 10,-10 Z',
  busto: 'M200,200 C232,200 246,222 246,246 C246,262 240,272 240,282 C268,296 282,330 284,378 L288,466 a24,24 0 0 1 -24,24 H136 a24,24 0 0 1 -24,-24 L116,378 C118,330 132,296 160,282 C160,272 154,262 154,246 C154,222 168,200 200,200 Z',
  robot: 'M138,214 a18,18 0 0 1 18,-18 H244 a18,18 0 0 1 18,18 V300 L286,318 V466 a24,24 0 0 1 -24,24 H138 a24,24 0 0 1 -24,-24 V318 L138,300 Z',
  rayo: 'M126,200 H274 a12,12 0 0 1 12,12 V330 L214,330 L262,398 L190,398 L138,330 L126,330 V212 a12,12 0 0 1 12,-12 Z M138,346 H186 L246,420 V478 a12,12 0 0 1 -12,12 H150 a12,12 0 0 1 -12,-12 Z',
  apotecario: 'M136,286 Q136,250 168,238 V214 H232 V238 Q264,250 264,286 V464 Q264,490 238,490 H162 Q136,490 136,464 Z'
};

/* Cuello + tapa por forma: [anchoCuello, altoCuello, yTope, anchoTapa, altoTapa] */
const CUELLOS = {
  rect:       [62, 34, 196, 92, 60],
  torre:      [50, 32, 182, 74, 56],
  flacon:     [56, 44, 200, 86, 58],
  cofre:      [58, 40, 272, 88, 58],
  gota:       [44, 30, 200, 68, 50],
  diamante:   [50, 30, 192, 76, 52],
  urna:       [52, 26, 196, 78, 50],
  anfora:     [46, 26, 190, 72, 48],
  redondo:    [56, 44, 238, 84, 56],
  trofeo:     [64, 26, 222, 96, 52],
  plano:      [40, 30, 178, 62, 50],
  busto:      [40, 34, 200, 62, 52],
  robot:      [54, 30, 196, 82, 54],
  rayo:       [58, 30, 200, 86, 54],
  apotecario: [78, 26, 214, 104, 46]
};

/* Placa de la etiqueta: centro vertical y ancho, ajustados al cuerpo de cada forma */
const ETIQUETAS = {
  rect:       { y: 372, w: 108 },
  torre:      { y: 372, w: 100 },
  flacon:     { y: 380, w: 108 },
  cofre:      { y: 396, w: 118 },
  gota:       { y: 400, w: 104 },
  diamante:   { y: 372, w: 104 },
  urna:       { y: 400, w: 100 },
  anfora:     { y: 386, w: 104 },
  redondo:    { y: 372, w: 112 },
  trofeo:     { y: 348, w: 84 },
  plano:      { y: 380, w: 60 },
  busto:      { y: 400, w: 108 },
  robot:      { y: 400, w: 110 },
  rayo:       { y: 442, w: 92 },
  apotecario: { y: 396, w: 106 }
};

const escapar = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Genera el SVG del packshot.
 * @param {{forma:string, vidrio:string, vidrio2:string, tapa:string, acento:string}} frasco
 * @param {{nombre:string, marca:string}} perfume
 */
function frascoSVG(frasco, perfume) {
  const forma = CUERPOS[frasco.forma] ? frasco.forma : 'rect';
  const cuerpo = CUERPOS[forma];
  const [anchoCuello, altoCuello, yTope, anchoTapa, altoTapa] = CUELLOS[forma];
  const { y: yEtiqueta, w: anchoPlaca } = ETIQUETAS[forma];
  const xPlaca = 200 - anchoPlaca / 2;
  const metal = METALES[frasco.tapa] || METALES.oro;

  const xCuello = 200 - anchoCuello / 2;
  const yCuello = yTope - altoCuello;
  const xTapa = 200 - anchoTapa / 2;
  const yTapa = yCuello - altoTapa;

  // Iniciales de la casa perfumista para la placa grabada
  const iniciales = perfume.marca
    .split(/\s+/)
    .filter(p => p.length > 2)
    .slice(0, 3)
    .map(p => p[0].toUpperCase())
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" role="img" aria-label="${escapar(perfume.nombre)} de ${escapar(perfume.marca)}">
  <defs>
    <linearGradient id="g-vidrio" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${frasco.vidrio}"/>
      <stop offset="52%" stop-color="${frasco.vidrio}"/>
      <stop offset="100%" stop-color="${frasco.vidrio2}"/>
    </linearGradient>
    <linearGradient id="g-brillo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity=".46"/>
      <stop offset="38%" stop-color="#fff" stop-opacity=".08"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="g-metal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${metal.c3}"/>
      <stop offset="22%" stop-color="${metal.c1}"/>
      <stop offset="52%" stop-color="${metal.c2}"/>
      <stop offset="78%" stop-color="${metal.c1}"/>
      <stop offset="100%" stop-color="${metal.c3}"/>
    </linearGradient>
    <linearGradient id="g-placa" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${metal.c1}" stop-opacity=".95"/>
      <stop offset="100%" stop-color="${metal.c2}" stop-opacity=".85"/>
    </linearGradient>
    <radialGradient id="g-sombra" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#2A2E33" stop-opacity=".34"/>
      <stop offset="100%" stop-color="#2A2E33" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="recorte-cuerpo"><path d="${cuerpo}"/></clipPath>
  </defs>

  <ellipse cx="200" cy="504" rx="132" ry="26" fill="url(#g-sombra)"/>

  <g>
    <rect x="${xCuello}" y="${yCuello}" width="${anchoCuello}" height="${altoCuello + 14}" fill="url(#g-vidrio)" opacity=".92"/>
    <rect x="${xTapa}" y="${yTapa}" width="${anchoTapa}" height="${altoTapa}" rx="7" fill="url(#g-metal)"/>
    <rect x="${xTapa}" y="${yTapa + altoTapa - 9}" width="${anchoTapa}" height="9" rx="3" fill="${metal.c3}" opacity=".55"/>
    <rect x="${xTapa + 7}" y="${yTapa + 8}" width="7" height="${altoTapa - 20}" rx="3" fill="#fff" opacity=".34"/>
  </g>

  <path d="${cuerpo}" fill="url(#g-vidrio)"/>
  <g clip-path="url(#recorte-cuerpo)">
    <rect x="100" y="150" width="118" height="360" fill="url(#g-brillo)"/>
    <ellipse cx="292" cy="470" rx="70" ry="52" fill="#fff" opacity=".07"/>
    <rect x="88" y="452" width="240" height="46" fill="${frasco.vidrio2}" opacity=".45"/>
  </g>
  <path d="${cuerpo}" fill="none" stroke="#fff" stroke-opacity=".34" stroke-width="2"/>

  <g>
    <rect x="${xPlaca}" y="${yEtiqueta - 27}" width="${anchoPlaca}" height="54" rx="6" fill="url(#g-placa)"/>
    <rect x="${xPlaca + 5}" y="${yEtiqueta - 22}" width="${anchoPlaca - 10}" height="44" rx="4" fill="none" stroke="${metal.c3}" stroke-opacity=".5"/>
    <text x="200" y="${yEtiqueta + 9}" text-anchor="middle"
          font-family="Georgia, 'Playfair Display', serif" font-size="${anchoPlaca < 80 ? 20 : 27}" letter-spacing="${anchoPlaca < 80 ? 2 : 4}"
          fill="${metal.c3}" fill-opacity=".92">${escapar(iniciales)}</text>
  </g>

  <rect x="${xPlaca + 6}" y="${yEtiqueta + 44}" width="${anchoPlaca - 12}" height="2" rx="1" fill="${frasco.acento}" opacity=".5"/>
</svg>
`;
}

module.exports = { frascoSVG, METALES, CUERPOS, ETIQUETAS };
