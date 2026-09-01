/* ============================================
   PORTAL DE GESTIÓN DE CATÁLOGO
   Registra fragancias, calcula en qué secciones
   aparecen y exporta el archivo del generador.
   Los datos viven en localStorage de este navegador.
   ============================================ */

const CLAVE = 'smessence_portal_productos';

const $ = (sel) => document.querySelector(sel);
const formulario = $('#formulario');

let productos = cargar();

function cargar() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch {
        return [];
    }
}

function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(productos));
}

/* --------------------------------------------
   Identificador a partir del nombre
   -------------------------------------------- */
function aIdentificador(texto) {
    return String(texto)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/['’`´]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/* --------------------------------------------
   LA REGLA DE ORGANIZACIÓN
   Un perfume aparece en:
     · Masculinas  si es masculino o unisex
     · Femeninas   si es femenino o unisex
     · Árabes      si su tipo es árabe
     · Nicho       si su tipo es nicho
     · Catálogo    siempre, en la portada
   El tipo (diseñador / árabe / nicho) además
   alimenta los filtros de todas las secciones.
   -------------------------------------------- */
const SECCIONES = {
    masculinas: { nombre: 'Masculinas', archivo: 'masculinas.html' },
    femeninas: { nombre: 'Femeninas', archivo: 'femeninas.html' },
    arabes: { nombre: 'Árabes', archivo: 'arabes.html' },
    nicho: { nombre: 'Nicho', archivo: 'nicho.html' },
    catalogo: { nombre: 'Catálogo de la portada', archivo: 'index.html' }
};

function destinosDe(genero, tipo) {
    const destinos = [];
    if (genero === 'm' || genero === 'u') destinos.push('masculinas');
    if (genero === 'f' || genero === 'u') destinos.push('femeninas');
    if (tipo === 'arabe') destinos.push('arabes');
    if (tipo === 'nicho') destinos.push('nicho');
    destinos.push('catalogo');
    return destinos;
}

const NOMBRE_TIPO = { disenador: 'Diseñador', arabe: 'Árabe', nicho: 'Nicho' };
const NOMBRE_GENERO = { m: 'Masculino', f: 'Femenino', u: 'Unisex' };

/* --------------------------------------------
   Lee el formulario
   -------------------------------------------- */
function leerFormulario() {
    const nombre = $('#f-nombre').value.trim();
    const marca = $('#f-marca').value.trim();
    const genero = formulario.querySelector('[name="genero"]:checked').value;
    const tipo = formulario.querySelector('[name="tipo"]:checked').value;
    const id = $('#f-id').value.trim() || aIdentificador(nombre);

    return {
        id, nombre, marca, genero, tipo,
        precio: Number($('#f-precio').value) || 0,
        familia: $('#f-familia').value.trim(),
        notas: {
            salida: $('#f-salida').value.trim(),
            corazon: $('#f-corazon').value.trim(),
            fondo: $('#f-fondo').value.trim()
        },
        ocasion: $('#f-ocasion').value.trim(),
        duracion: $('#f-duracion').value.trim(),
        desc: $('#f-desc').value.split('\n').map(t => t.trim()).filter(Boolean),
        frasco: {
            forma: $('#f-forma').value,
            vidrio: $('#f-vidrio').value,
            vidrio2: $('#f-vidrio2').value,
            tapa: $('#f-tapa').value,
            acento: '#C9AE7F'
        }
    };
}

/* --------------------------------------------
   Panel de destinos
   -------------------------------------------- */
function pintarDestinos() {
    const genero = formulario.querySelector('[name="genero"]:checked').value;
    const tipo = formulario.querySelector('[name="tipo"]:checked').value;
    const destinos = destinosDe(genero, tipo);

    $('#destinos').innerHTML = Object.entries(SECCIONES).map(([clave, s]) => {
        const va = destinos.includes(clave);
        return `<li class="destino ${va ? 'destino--si' : 'destino--no'}">
            <span class="destino__marca" aria-hidden="true">${va ? '✓' : '—'}</span>
            <span class="destino__nombre">${s.nombre}</span>
            <code>${s.archivo}</code>
        </li>`;
    }).join('');

    $('#regla').innerHTML = `Como es <strong>${NOMBRE_GENERO[genero]}</strong> y de perfumería
        <strong>${NOMBRE_TIPO[tipo]}</strong>, se publicará en
        <strong>${destinos.length}</strong> ${destinos.length === 1 ? 'sección' : 'secciones'}.
        En los filtros aparecerá bajo <strong>${NOMBRE_TIPO[tipo]}</strong>.`;
}

/* --------------------------------------------
   Vista previa de la tarjeta
   -------------------------------------------- */
const METAL = {
    oro: ['#F2E3C0', '#C9AE7F', '#8A6B35'],
    plata: ['#EFF2F4', '#C4C8CC', '#7E858C'],
    negro: ['#4A4F55', '#2A2E33', '#111316'],
    rojo: ['#D9736A', '#B23A3A', '#6E1C1C']
};

function frascoPrevio(f) {
    const [c1, c2, c3] = METAL[f.tapa] || METAL.oro;
    return `<svg viewBox="0 0 400 560" aria-hidden="true">
        <defs>
            <linearGradient id="pv" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${f.vidrio}"/>
                <stop offset="100%" stop-color="${f.vidrio2}"/>
            </linearGradient>
            <linearGradient id="pm" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="${c3}"/><stop offset="25%" stop-color="${c1}"/>
                <stop offset="60%" stop-color="${c2}"/><stop offset="100%" stop-color="${c3}"/>
            </linearGradient>
        </defs>
        <ellipse cx="200" cy="504" rx="126" ry="24" fill="#2A2E33" opacity=".16"/>
        <rect x="169" y="162" width="62" height="48" fill="url(#pv)" opacity=".9"/>
        <rect x="154" y="120" width="92" height="56" rx="7" fill="url(#pm)"/>
        <rect x="132" y="196" width="136" height="294" rx="14" fill="url(#pv)"/>
        <rect x="146" y="345" width="108" height="54" rx="6" fill="${c2}" opacity=".9"/>
    </svg>`;
}

function pintarPrevia() {
    const p = leerFormulario();
    const precio = p.precio ? '$' + p.precio.toLocaleString('es-CO') + ' COP' : '$0 COP';
    $('#previa').innerHTML = `
        <article class="tarjeta">
            <div class="tarjeta__marco">
                <div class="tarjeta__insignias">
                    <span class="insignia">${NOMBRE_TIPO[p.tipo]}</span>
                    ${p.genero === 'u' ? '<span class="insignia insignia--tenue">Unisex</span>' : ''}
                </div>
                ${frascoPrevio(p.frasco)}
            </div>
            <div class="tarjeta__info">
                <p class="tarjeta__marca">${p.marca || 'Marca'}</p>
                <p class="tarjeta__nombre">${p.nombre || 'Nombre de la fragancia'}</p>
                <p class="tarjeta__precio">${precio}</p>
            </div>
        </article>`;
}

/* --------------------------------------------
   Lista de pendientes
   -------------------------------------------- */
function pintarLista() {
    $('#contador').textContent = productos.length;

    if (productos.length === 0) {
        $('#lista').innerHTML = '<p class="vacio">Todavía no has registrado ninguna fragancia.</p>';
        return;
    }

    $('#lista').innerHTML = productos.map((p, i) => {
        const destinos = destinosDe(p.genero, p.tipo)
            .map(d => `<span class="etiqueta">${SECCIONES[d].nombre}</span>`).join('');
        return `<article class="fila">
            <div class="fila__datos">
                <p class="fila__nombre">${p.nombre} <span class="fila__marca">${p.marca}</span></p>
                <p class="fila__meta"><code>${p.id}</code> · ${NOMBRE_GENERO[p.genero]} ·
                   ${NOMBRE_TIPO[p.tipo]} · $${p.precio.toLocaleString('es-CO')} COP</p>
                <div class="fila__destinos">${destinos}</div>
            </div>
            <div class="fila__acciones">
                <button type="button" class="btn-linea btn-linea--mini" data-editar="${i}">Editar</button>
                <button type="button" class="btn-linea btn-linea--mini btn-linea--riesgo" data-borrar="${i}">Quitar</button>
            </div>
        </article>`;
    }).join('');
}

/* --------------------------------------------
   Alta y edición
   -------------------------------------------- */
let editando = null;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const p = leerFormulario();

    if (!p.id) {
        avisar('Falta el nombre para generar el identificador.', true);
        return;
    }

    const choque = productos.findIndex((o, i) => o.id === p.id && i !== editando);
    if (choque !== -1) {
        avisar('Ya existe una fragancia con el identificador «' + p.id + '».', true);
        return;
    }

    if (editando === null) {
        productos.push(p);
        avisar('«' + p.nombre + '» agregada al catálogo.');
    } else {
        productos[editando] = p;
        avisar('«' + p.nombre + '» actualizada.');
        editando = null;
        $('#btn-guardar').textContent = 'Agregar al catálogo';
    }

    guardar();
    pintarLista();
    formulario.reset();
    pintarDestinos();
    pintarPrevia();
    $('#f-nombre').focus();
});

$('#lista').addEventListener('click', (e) => {
    const editar = e.target.dataset.editar;
    const borrar = e.target.dataset.borrar;

    if (editar !== undefined) {
        const p = productos[Number(editar)];
        editando = Number(editar);
        $('#f-nombre').value = p.nombre;
        $('#f-marca').value = p.marca;
        $('#f-id').value = p.id;
        $('#f-precio').value = p.precio;
        $('#f-familia').value = p.familia;
        $('#f-salida').value = p.notas.salida;
        $('#f-corazon').value = p.notas.corazon;
        $('#f-fondo').value = p.notas.fondo;
        $('#f-ocasion').value = p.ocasion;
        $('#f-duracion').value = p.duracion;
        $('#f-desc').value = p.desc.join('\n');
        $('#f-forma').value = p.frasco.forma;
        $('#f-tapa').value = p.frasco.tapa;
        $('#f-vidrio').value = p.frasco.vidrio;
        $('#f-vidrio2').value = p.frasco.vidrio2;
        formulario.querySelector(`[name="genero"][value="${p.genero}"]`).checked = true;
        formulario.querySelector(`[name="tipo"][value="${p.tipo}"]`).checked = true;
        $('#btn-guardar').textContent = 'Guardar cambios';
        pintarDestinos();
        pintarPrevia();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (borrar !== undefined) {
        const p = productos[Number(borrar)];
        if (!confirm('¿Quitar «' + p.nombre + '» de la lista?')) return;
        productos.splice(Number(borrar), 1);
        if (editando === Number(borrar)) {
            editando = null;
            $('#btn-guardar').textContent = 'Agregar al catálogo';
            formulario.reset();
        }
        guardar();
        pintarLista();
        avisar('«' + p.nombre + '» quitada de la lista.');
    }
});

$('#btn-limpiar').addEventListener('click', () => {
    formulario.reset();
    editando = null;
    $('#btn-guardar').textContent = 'Agregar al catálogo';
    pintarDestinos();
    pintarPrevia();
});

$('#btn-vaciar').addEventListener('click', () => {
    if (productos.length === 0) return;
    if (!confirm('Se quitarán las ' + productos.length + ' fragancias de la lista. Esto no se puede deshacer. ¿Continuar?')) return;
    productos = [];
    guardar();
    pintarLista();
    avisar('Lista vaciada.');
});

/* --------------------------------------------
   Exportar el archivo del generador
   -------------------------------------------- */
$('#btn-exportar').addEventListener('click', () => {
    if (productos.length === 0) {
        avisar('No hay nada que exportar todavía.', true);
        return;
    }

    const cuerpo = productos.map(p => `  {
    id: ${JSON.stringify(p.id)}, nombre: ${JSON.stringify(p.nombre)}, marca: ${JSON.stringify(p.marca)},
    genero: ${JSON.stringify(p.genero)}, tipo: ${JSON.stringify(p.tipo)}, precio: ${p.precio},
    familia: ${JSON.stringify(p.familia)},
    desc: ${JSON.stringify(p.desc)},
    notas: { salida: ${JSON.stringify(p.notas.salida)}, corazon: ${JSON.stringify(p.notas.corazon)}, fondo: ${JSON.stringify(p.notas.fondo)} },
    ocasion: ${JSON.stringify(p.ocasion)},
    duracion: ${JSON.stringify(p.duracion)},
    frasco: { forma: ${JSON.stringify(p.frasco.forma)}, vidrio: ${JSON.stringify(p.frasco.vidrio)}, vidrio2: ${JSON.stringify(p.frasco.vidrio2)}, tapa: ${JSON.stringify(p.frasco.tapa)}, acento: ${JSON.stringify(p.frasco.acento)} }
  }`).join(',\n');

    const archivo = `/* =========================================================
   Generado por el portal de gestión de Smessence
   ${new Date().toLocaleString('es-CO')}
   ${productos.length} ${productos.length === 1 ? 'fragancia' : 'fragancias'}
   ========================================================= */

const NUEVOS4 = [
${cuerpo}
];

module.exports = { NUEVOS4 };
`;

    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([archivo], { type: 'text/javascript' }));
    enlace.download = 'datos-portal.js';
    enlace.click();
    URL.revokeObjectURL(enlace.href);
    avisar('Archivo descargado: datos-portal.js');
});

/* --------------------------------------------
   Avisos
   -------------------------------------------- */
let temporizadorAviso = null;
function avisar(texto, error) {
    let caja = document.querySelector('.aviso');
    if (!caja) {
        caja = document.createElement('div');
        caja.className = 'aviso';
        caja.setAttribute('role', 'status');
        document.body.appendChild(caja);
    }
    caja.textContent = texto;
    caja.classList.toggle('aviso--error', Boolean(error));
    caja.classList.add('visible');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => caja.classList.remove('visible'), 3200);
}

/* --------------------------------------------
   Arranque
   -------------------------------------------- */
formulario.addEventListener('input', () => {
    pintarDestinos();
    pintarPrevia();
});
formulario.addEventListener('change', () => {
    pintarDestinos();
    pintarPrevia();
});

// El identificador se sugiere solo mientras no se escriba a mano
$('#f-nombre').addEventListener('input', () => {
    const campoId = $('#f-id');
    if (!campoId.dataset.manual) campoId.placeholder = aIdentificador($('#f-nombre').value) || 'se genera solo';
});
$('#f-id').addEventListener('input', (e) => {
    e.target.dataset.manual = e.target.value ? '1' : '';
});

pintarDestinos();
pintarPrevia();
pintarLista();
