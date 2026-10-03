/* =========================================================
   FICHA TÉCNICA
   Calcula, a partir de la pirámide olfativa y la familia de
   cada fragancia, sus acordes principales y en qué estación
   y momento del día luce mejor. No hay datos de terceros:
   todo sale de las notas que ya están en datos.js.
   ========================================================= */

const sinTildes = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ---------- Acordes ----------
   claves: palabras que delatan el acorde en una nota.
   color:  tono de la barra (pasteles de la paleta de la tienda).
   clima:  afinidad [primavera, verano, otoño, invierno, día, noche].
   ------------------------------- */
const ACORDES = {
  citrico:    { nombre: 'Cítrico',    color: '#E4D17E', clima: [.8, 1, .2, 0, 1, .1],
                claves: ['citrico', 'limon', 'bergamota', 'naranja', 'mandarina', 'pomelo', 'toronja', 'lima', 'yuzu', 'petitgrain', 'neroli', 'cidra'] },
  aromatico:  { nombre: 'Aromático',  color: '#9DB8A0', clima: [.8, .8, .5, .3, .9, .3],
                claves: ['aromatico', 'fougere', 'lavanda', 'lavandin', 'romero', 'salvia', 'menta', 'albahaca', 'geranio', 'artemisa', 'enebro', 'hierbas', 'tomillo', 'estragon', 'absenta', 'anis'] },
  acuatico:   { nombre: 'Acuático',   color: '#9EC3D6', clima: [.6, 1, .1, 0, 1, .1],
                claves: ['acuatico', 'marino', 'marina', 'sal', 'oceano', 'algas', 'ozono', 'ozonico', 'brisa', 'calone', 'agua'] },
  verde:      { nombre: 'Verde',      color: '#A9C58F', clima: [1, .7, .2, 0, 1, .1],
                claves: ['verde', 'hojas', 'hoja', 'galbano', 'higuera', 'pepino', 'bambu', 'cesped', 'te', 'mate', 'hiedra'] },
  fresco:     { nombre: 'Fresco',     color: '#BFDCD2', clima: [.9, 1, .3, .1, 1, .2],
                claves: ['fresco', 'fresca', 'frescos', 'frescas'] },
  frutal:     { nombre: 'Frutal',     color: '#E8A7A0', clima: [.9, .7, .3, .1, .8, .4],
                claves: ['frutal', 'manzana', 'pera', 'pina', 'grosella', 'cassis', 'frambuesa', 'fresa', 'melocoton', 'durazno', 'mango', 'lichi', 'frutos', 'ciruela', 'cereza', 'coco', 'maracuya', 'uva', 'sandia', 'melon', 'datiles', 'datil', 'higo', 'granada', 'mora', 'arandano', 'albaricoque', 'membrillo', 'nashi'] },
  floral:     { nombre: 'Floral',     color: '#E7B7C8', clima: [1, .6, .4, .2, .8, .4],
                claves: ['floral', 'rosa', 'jazmin', 'peonia', 'lirio', 'magnolia', 'gardenia', 'flor', 'flores', 'orquidea', 'fresia', 'freesia', 'azahar', 'nardo', 'tuberosa', 'ylang', 'mimosa', 'osmanto', 'muguete', 'loto', 'camelia', 'violeta', 'iris', 'heliotropo', 'lila', 'clavel', 'sambac', 'madreselva', 'genciana', 'enredadera'] },
  atalcado:   { nombre: 'Atalcado',   color: '#DCCCE4', clima: [.8, .3, .5, .4, .7, .4],
                claves: ['atalcado', 'polvoso', 'iris', 'violeta', 'heliotropo', 'talco', 'orris'] },
  gourmand:   { nombre: 'Gourmand',   color: '#C9A27E', clima: [.1, 0, .8, 1, .3, .9],
                claves: ['gourmand', 'dulce', 'caramelo', 'praline', 'miel', 'chocolate', 'cacao', 'azucar', 'almendra', 'toffee', 'malvavisco', 'crema', 'leche', 'avellana', 'cafe', 'galleta', 'merengue', 'algodon de azucar', 'castana', 'nuez'] },
  licoroso:   { nombre: 'Licoroso',   color: '#B98B73', clima: [.2, .3, .8, .8, .3, .9],
                claves: ['licor', 'licores', 'ron', 'cognac', 'whisky', 'bourbon', 'vino', 'champan', 'ginebra', 'brandy'] },
  vainilla:   { nombre: 'Vainilla',   color: '#E9D8B4', clima: [.2, 0, .8, 1, .3, .9],
                claves: ['vainilla', 'tonka', 'haba tonka'] },
  especiado:  { nombre: 'Especiado',  color: '#C98A5E', clima: [.4, .3, .9, .7, .6, .6],
                claves: ['especiado', 'especias', 'pimienta', 'canela', 'cardamomo', 'moscada', 'clavo', 'jengibre', 'azafran', 'comino', 'pimiento', 'elemi', 'cilantro'] },
  amaderado:  { nombre: 'Amaderado',  color: '#A68A6A', clima: [.4, .2, 1, .7, .6, .6],
                claves: ['amaderado', 'madera', 'maderas', 'cedro', 'sandalo', 'vetiver', 'guayaco', 'cachemira', 'cashmeran', 'pachuli', 'iso e super', 'papiro', 'cipres', 'pino', 'abeto', 'chipre', 'musgo', 'roble', 'ebano', 'palo'] },
  ambarado:   { nombre: 'Ambarado',   color: '#D4A35F', clima: [.1, 0, .8, 1, .2, 1],
                claves: ['ambar', 'ambarado', 'ambroxan', 'ambrox', 'oriental', 'benjui', 'labdano', 'labdanum', 'resina', 'resinas', 'mirra', 'opoponax', 'balsamo', 'estoraque', 'copal', 'tolu', 'peru'] },
  oud:        { nombre: 'Oud',        color: '#7A5A44', clima: [0, 0, .7, 1, .2, 1],
                claves: ['oud', 'agar', 'agarwood'] },
  cuero:      { nombre: 'Cuero',      color: '#8A6650', clima: [.1, 0, .9, .9, .3, .9],
                claves: ['cuero', 'gamuza', 'ante', 'piel'] },
  tabaco:     { nombre: 'Tabaco',     color: '#9A7552', clima: [0, 0, .9, 1, .2, 1],
                claves: ['tabaco'] },
  ahumado:    { nombre: 'Ahumado',    color: '#8E9095', clima: [.1, 0, .8, .9, .3, .9],
                claves: ['ahumado', 'ahumada', 'ahumadas', 'incienso', 'olibano', 'abedul', 'humo', 'brea', 'alquitran'] },
  almizclado: { nombre: 'Almizclado', color: '#D5D0E2', clima: [.7, .5, .5, .5, .7, .5],
                claves: ['almizcle', 'almizcles', 'almizclado', 'musk', 'ambreta'] }
};

// Frases que contienen una palabra clave engañosa: se reescriben antes de buscar
const AJUSTES = [
  [/pimienta rosa/g, 'pimienta'],
  [/baya(s)? rosa(s)?/g, 'pimienta'],
  [/flor de sal/g, 'sal'],
  [/agua de coco/g, 'coco'],
  [/piel de (naranja|limon|mandarina)/g, '$1'],
  [/ambar gris/g, 'ambar'],
  [/te negro/g, 'te'],
  [/nuez moscada/g, 'moscada'],
  [/(\w+) de (iris|lirio)/g, 'iris']
];

const PESOS = { salida: 1, corazon: 1.35, fondo: 1.7 };
// En la familia manda la primera palabra: "Cuero floral" es ante todo cuero
const PESO_FAMILIA = [3.6, 1.6];

const escRe = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PATRONES = Object.fromEntries(Object.entries(ACORDES).map(([k, a]) =>
  [k, new RegExp('\\b(' + a.claves.map(escRe).join('|') + ')\\b')]));

function prepara(texto) {
  let t = sinTildes(texto);
  for (const [re, rep] of AJUSTES) t = t.replace(re, rep);
  return t;
}

// Separa "Limón, piña y bergamota" en notas sueltas
const notasSueltas = texto => prepara(texto).split(/,|\s+y\s+|\s+e\s+|·|\//).map(s => s.trim()).filter(Boolean);

function acordesDe(p) {
  const puntos = {};
  const sumar = (texto, peso) => {
    for (const [k, re] of Object.entries(PATRONES)) if (re.test(texto)) puntos[k] = (puntos[k] || 0) + peso;
  };

  for (const nivel of ['salida', 'corazon', 'fondo']) {
    for (const nota of notasSueltas(p.notas && p.notas[nivel])) sumar(nota, PESOS[nivel]);
  }
  // La familia comercial ("Ámbar amaderado especiado · Eau de Parfum") pesa más
  const contados = new Set();
  prepara(String(p.familia || '').split('·')[0]).split(/\s+/).filter(Boolean).forEach((palabra, i) => {
    for (const [k, re] of Object.entries(PATRONES)) {
      if (contados.has(k) || !re.test(palabra)) continue;
      contados.add(k);
      puntos[k] = (puntos[k] || 0) + PESO_FAMILIA[i === 0 ? 0 : 1];
    }
  });

  const orden = Object.entries(puntos).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (!orden.length) return [];
  const max = orden[0][1];
  return orden.map(([k, v]) => ({
    clave: k, nombre: ACORDES[k].nombre, color: ACORDES[k].color,
    puntos: v, ancho: Math.max(28, Math.round(100 * v / max))
  }));
}

/* ---------- Estación y momento del día ---------- */
const ESTACIONES = ['primavera', 'verano', 'otono', 'invierno'];

function climaDe(acordes) {
  const total = [0, 0, 0, 0, 0, 0];
  for (const a of acordes) ACORDES[a.clave].clima.forEach((w, i) => { total[i] += w * a.puntos; });

  const maxEst = Math.max(...total.slice(0, 4)) || 1;
  const maxMom = Math.max(total[4], total[5]) || 1;
  const pct = (v, m) => Math.round(100 * v / m);
  return {
    primavera: pct(total[0], maxEst), verano: pct(total[1], maxEst),
    otono: pct(total[2], maxEst), invierno: pct(total[3], maxEst),
    dia: pct(total[4], maxMom), noche: pct(total[5], maxMom)
  };
}

// "Ámbar amaderado · Eau de Parfum" → "Eau de Parfum"
const concentracionDe = familia => {
  const partes = String(familia || '').split('·');
  return partes.length > 1 ? partes[partes.length - 1].trim() : '';
};

/* ---------- Filtros de las secciones ----------
   Los 18 acordes se agrupan en 7 estilos fáciles de entender.
   Un perfume entra en un estilo si alguno de sus 3 acordes
   principales (con fuerza suficiente) pertenece a él.
   ----------------------------------------------- */
const ESTILOS = {
  fresco:    { nombre: 'Frescos',     acordes: ['citrico', 'acuatico', 'fresco', 'verde', 'aromatico'] },
  floral:    { nombre: 'Florales',    acordes: ['floral', 'atalcado'] },
  frutal:    { nombre: 'Frutales',    acordes: ['frutal'] },
  dulce:     { nombre: 'Dulces',      acordes: ['gourmand', 'vainilla', 'licoroso'] },
  especiado: { nombre: 'Especiados',  acordes: ['especiado'] },
  amaderado: { nombre: 'Amaderados',  acordes: ['amaderado'] },
  oriental:  { nombre: 'Ámbar y oud', acordes: ['ambarado', 'oud', 'tabaco', 'cuero', 'ahumado'] }
};

function estilosDe(acordes) {
  const fuertes = acordes.slice(0, 3).filter(a => a.ancho >= 40).map(a => a.clave);
  return Object.keys(ESTILOS).filter(e => ESTILOS[e].acordes.some(a => fuertes.includes(a)));
}

const CUANDO = { calor: 'Clima cálido', frio: 'Clima frío', dia: 'De día', noche: 'De noche' };

function cuandoDe(c) {
  const lista = [];
  if ((c.primavera + c.verano) / 2 >= 75) lista.push('calor');
  if ((c.otono + c.invierno) / 2 >= 80) lista.push('frio');
  if (c.dia >= 90) lista.push('dia');
  if (c.noche >= 90) lista.push('noche');
  return lista;
}

/* ---------- Parecido entre dos fragancias ----------
   Similitud coseno entre sus vectores de acordes: 1 es
   idéntico, 0 no comparten nada.
   ---------------------------------------------------- */
function similitud(a, b) {
  const va = Object.fromEntries(a.map(x => [x.clave, x.puntos]));
  const vb = Object.fromEntries(b.map(x => [x.clave, x.puntos]));
  let punto = 0;
  for (const k in va) if (vb[k]) punto += va[k] * vb[k];
  const norma = v => Math.sqrt(Object.values(v).reduce((s, x) => s + x * x, 0));
  return punto / ((norma(va) * norma(vb)) || 1);
}

module.exports = {
  ACORDES, ESTACIONES, ESTILOS, CUANDO,
  acordesDe, climaDe, concentracionDe, estilosDe, cuandoDe, similitud
};
