/* ============================================
   SMESSENCE — BORRADOR · comportamiento
   ============================================ */

/* --------------------------------------------
   TEMA CLARO / OSCURO
   El atributo data-tema ya lo fija un snippet
   en el <head> para evitar el parpadeo.
   -------------------------------------------- */
(function () {
    const cabecera = document.querySelector('.cabecera');
    if (!cabecera) return;

    const LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.6" y1="4.6" x2="6" y2="6"/><line x1="18" y1="18" x2="19.4" y2="19.4"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.6" y1="19.4" x2="6" y2="18"/><line x1="18" y1="6" x2="19.4" y2="4.6"/></svg>';

    const boton = document.createElement('button');
    boton.className = 'tema-btn';
    boton.type = 'button';

    function pintar() {
        const oscuro = document.documentElement.dataset.tema === 'oscuro';
        boton.innerHTML = oscuro ? SOL : LUNA;
        boton.setAttribute('aria-label', oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }

    boton.addEventListener('click', () => {
        const nuevo = document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
        document.documentElement.dataset.tema = nuevo;
        localStorage.setItem('tema', nuevo);
        pintar();
    });

    pintar();
    cabecera.appendChild(boton);
})();

/* --------------------------------------------
   CARRUSEL DE PORTADA
   Fundido cruzado + acercamiento lento, flechas
   y puntos indicadores.
   -------------------------------------------- */
(function () {
    const hero = document.querySelector('.portada-hero');
    if (!hero) return;

    const slides = [...hero.querySelectorAll('.diapositiva')];
    const contenedorPuntos = hero.querySelector('.hero-puntos');
    const prev = hero.querySelector('.hero-flecha--prev');
    const next = hero.querySelector('.hero-flecha--next');
    if (slides.length < 2) return;

    const INTERVALO = 6500;
    let indice = 0;
    let temporizador = null;

    const puntos = slides.map((_, i) => {
        const punto = document.createElement('button');
        punto.className = 'hero-punto' + (i === 0 ? ' activo' : '');
        punto.type = 'button';
        punto.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
        punto.addEventListener('click', () => { irA(i); reiniciar(); });
        contenedorPuntos.appendChild(punto);
        return punto;
    });

    function irA(nuevo) {
        indice = (nuevo + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('activa', i === indice));
        puntos.forEach((p, i) => p.classList.toggle('activo', i === indice));
    }

    function iniciar() {
        if (!temporizador) temporizador = setInterval(() => irA(indice + 1), INTERVALO);
    }
    function detener() {
        clearInterval(temporizador);
        temporizador = null;
    }
    function reiniciar() { detener(); iniciar(); }

    next.addEventListener('click', () => { irA(indice + 1); reiniciar(); });
    prev.addEventListener('click', () => { irA(indice - 1); reiniciar(); });

    // Pausa mientras el usuario mira o interactúa
    hero.addEventListener('mouseenter', detener);
    hero.addEventListener('mouseleave', iniciar);
    hero.addEventListener('focusin', detener);
    hero.addEventListener('focusout', iniciar);

    hero.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { irA(indice - 1); reiniciar(); }
        if (e.key === 'ArrowRight') { irA(indice + 1); reiniciar(); }
    });

    let tactoX = null;
    hero.addEventListener('touchstart', (e) => { tactoX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
        if (tactoX === null) return;
        const delta = e.changedTouches[0].clientX - tactoX;
        if (Math.abs(delta) > 45) { irA(indice + (delta < 0 ? 1 : -1)); reiniciar(); }
        tactoX = null;
    }, { passive: true });

    iniciar();
})();

/* --------------------------------------------
   RIEL HORIZONTAL (novedades)
   -------------------------------------------- */
(function () {
    document.querySelectorAll('.riel-envoltura').forEach((envoltura) => {
        const riel = envoltura.querySelector('.riel');
        const prev = envoltura.querySelector('.riel-flecha--prev');
        const next = envoltura.querySelector('.riel-flecha--next');
        if (!riel || !prev || !next) return;

        const paso = () => {
            const tarjeta = riel.querySelector('.tarjeta');
            return tarjeta ? tarjeta.offsetWidth + 20 : riel.clientWidth * 0.8;
        };

        prev.addEventListener('click', () => riel.scrollBy({ left: -paso() * 2, behavior: 'smooth' }));
        next.addEventListener('click', () => riel.scrollBy({ left: paso() * 2, behavior: 'smooth' }));

        function actualizarFlechas() {
            const fin = riel.scrollWidth - riel.clientWidth - 4;
            prev.style.opacity = riel.scrollLeft <= 4 ? '.35' : '1';
            next.style.opacity = riel.scrollLeft >= fin ? '.35' : '1';
        }
        riel.addEventListener('scroll', actualizarFlechas, { passive: true });
        window.addEventListener('resize', actualizarFlechas);
        actualizarFlechas();
    });
})();

/* --------------------------------------------
   NORMALIZAR TEXTO (quita tildes y mayúsculas)
   -------------------------------------------- */
function normalizar(texto) {
    return String(texto)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')   // tildes y diacríticos
        .replace(/['’`´]/g, '')          // apóstrofos: J'adore -> jadore
        .replace(/\s+/g, ' ');
}

/* --------------------------------------------
   FILTROS POR TIPO DE PERFUMERÍA
   -------------------------------------------- */
(function () {
    const rejilla = document.querySelector('.rejilla');
    if (!rejilla) return;

    const botones = [...document.querySelectorAll('.filtro')];
    const tarjetas = [...rejilla.querySelectorAll('.tarjeta')];
    const aviso = document.querySelector('.filtros-vacio');
    const verMas = document.getElementById('ver-mas');
    if (botones.length === 0) return;

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const filtro = boton.dataset.filtro;
            botones.forEach(b => b.classList.toggle('activo', b === boton));

            let visibles = 0;
            tarjetas.forEach((t) => {
                const coincide = filtro === 'todos' || t.dataset.tipo === filtro;
                t.classList.toggle('filtrado-fuera', !coincide);
                if (coincide) visibles++;
            });

            // Con un filtro activo se muestra todo lo que coincide, sin paginar
            if (filtro !== 'todos') {
                tarjetas.forEach(t => t.classList.remove('oculto'));
                if (verMas) verMas.style.display = 'none';
            } else if (verMas && tarjetas.some(t => t.classList.contains('oculto'))) {
                verMas.style.display = '';
            }

            if (aviso) aviso.hidden = visibles > 0;
        });
    });
})();

/* --------------------------------------------
   BUSCADOR DE LA BARRA DE NAVEGACIÓN
   Busca por nombre, marca, tipo y familia sobre
   el índice generado en indice.js.
   -------------------------------------------- */
(function () {
    const entrada = document.getElementById('buscador-entrada');
    const panel = document.getElementById('buscador-resultados');
    const limpiar = document.querySelector('.buscador__limpiar');
    if (!entrada || !panel || !window.INDICE_PERFUMES) return;

    const base = window.RUTA_BASE || '';
    const MAXIMO = 8;
    let resultados = [];
    let marcado = -1;

    const indice = window.INDICE_PERFUMES.map(e => ({
        ...e,
        // Nombre y marca pesan primero; las notas amplían la búsqueda
        busca: normalizar([e.n, e.m, e.k || ''].join(' '))
    }));

    const precioCOP = n => '$' + n.toLocaleString('es-CO');
    const imagen = clave => /^(frascos|productos)\//.test(clave)
        ? base + 'imagenes/' + clave
        : base + '../imagenes/' + clave;

    function buscar(texto) {
        const q = normalizar(texto).trim();
        if (q.length < 2) return [];
        const terminos = q.split(/\s+/);
        return indice
            .map((e) => {
                if (!terminos.every(t => e.busca.includes(t))) return null;
                // Prioriza coincidencias al inicio del nombre
                const nombre = normalizar(e.n);
                const peso = nombre.startsWith(q) ? 0 : nombre.includes(q) ? 1 : 2;
                return { e, peso };
            })
            .filter(Boolean)
            .sort((a, b) => a.peso - b.peso || a.e.n.localeCompare(b.e.n))
            .slice(0, MAXIMO)
            .map(r => r.e);
    }

    function pintar(lista, consulta) {
        resultados = lista;
        marcado = -1;
        if (lista.length === 0) {
            panel.innerHTML = consulta.trim().length < 2
                ? ''
                : '<p class="buscador__vacio">Sin resultados para «' + consulta + '»</p>';
            panel.hidden = consulta.trim().length < 2;
        } else {
            panel.innerHTML = lista.map((e, i) => `
                <a class="buscador__item" href="${base}${e.u}" role="option" data-i="${i}">
                    <img src="${imagen(e.i)}" alt="" decoding="async">
                    <span class="buscador__datos">
                        <span class="buscador__marca">${e.m}</span>
                        <span class="buscador__nombre">${e.n}</span>
                    </span>
                    <span class="buscador__precio">${precioCOP(e.p)}</span>
                </a>`).join('');
            panel.hidden = false;
        }
        entrada.setAttribute('aria-expanded', String(!panel.hidden));
        if (limpiar) limpiar.hidden = entrada.value.length === 0;
    }

    function marcar(delta) {
        const items = [...panel.querySelectorAll('.buscador__item')];
        if (items.length === 0) return;
        marcado = (marcado + delta + items.length) % items.length;
        items.forEach((it, i) => it.classList.toggle('marcado', i === marcado));
        items[marcado].scrollIntoView({ block: 'nearest' });
    }

    function cerrar() {
        panel.hidden = true;
        entrada.setAttribute('aria-expanded', 'false');
    }

    let temporizador = null;
    entrada.addEventListener('input', () => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => pintar(buscar(entrada.value), entrada.value), 120);
    });

    entrada.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); marcar(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); marcar(-1); }
        else if (e.key === 'Enter') {
            const items = [...panel.querySelectorAll('.buscador__item')];
            if (marcado >= 0 && items[marcado]) { e.preventDefault(); items[marcado].click(); }
            else if (items.length === 1) { e.preventDefault(); items[0].click(); }
        } else if (e.key === 'Escape') { cerrar(); entrada.blur(); }
    });

    if (limpiar) {
        limpiar.addEventListener('click', () => {
            entrada.value = '';
            limpiar.hidden = true;
            cerrar();
            entrada.focus();
        });
    }

    entrada.addEventListener('focus', () => {
        if (entrada.value.trim().length >= 2) pintar(buscar(entrada.value), entrada.value);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.buscador')) cerrar();
    });

    // Atajo: "/" enfoca el buscador
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
            e.preventDefault();
            entrada.focus();
        }
    });
})();

/* --------------------------------------------
   VER MÁS
   -------------------------------------------- */
(function () {
    const boton = document.getElementById('ver-mas');
    if (!boton) return;

    boton.addEventListener('click', function () {
        document.querySelectorAll('.oculto').forEach((el, i) => {
            el.classList.remove('oculto', 'visible');
            setTimeout(() => el.classList.add('visible'), 40 + (i % 8) * 60);
        });
        this.style.display = 'none';
    });
})();

/* --------------------------------------------
   APARICIÓN AL HACER SCROLL
   -------------------------------------------- */
(function () {
    const elementos = document.querySelectorAll('.revelar');
    if (elementos.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        document.documentElement.classList.add('sin-observador');
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('visible');
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });

    elementos.forEach((el, i) => {
        el.style.transitionDelay = ((i % 4) * 80) + 'ms';
        observador.observe(el);
    });
})();
