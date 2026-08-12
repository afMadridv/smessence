// ============================================
// TEMA CLARO / OSCURO
// El atributo data-tema ya viene puesto por el
// snippet inline del <head> (evita parpadeo).
// ============================================
(function () {
    const header = document.querySelector('.header');
    if (!header) return;

    const boton = document.createElement('button');
    boton.className = 'tema-btn';
    boton.type = 'button';

    const ICONO_LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const ICONO_SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.6" y1="4.6" x2="6" y2="6"/><line x1="18" y1="18" x2="19.4" y2="19.4"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.6" y1="19.4" x2="6" y2="18"/><line x1="18" y1="6" x2="19.4" y2="4.6"/></svg>';

    function pintarIcono() {
        const oscuro = document.documentElement.dataset.tema === 'oscuro';
        boton.innerHTML = oscuro ? ICONO_SOL : ICONO_LUNA;
        boton.setAttribute('aria-label', oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }

    boton.addEventListener('click', () => {
        const nuevo = document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
        document.documentElement.dataset.tema = nuevo;
        localStorage.setItem('tema', nuevo);
        pintarIcono();
    });

    pintarIcono();
    header.appendChild(boton);
})();

// ============================================
// HERO - CARRUSEL DE FOTOS
// Crossfade + Ken Burns, flechas, puntos,
// autoplay con pausa al pasar el mouse y swipe
// ============================================
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const slides = hero.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    const contenedorPuntos = hero.querySelector('.hero__puntos');
    const flechaPrev = hero.querySelector('.hero__flecha--prev');
    const flechaNext = hero.querySelector('.hero__flecha--next');
    const INTERVALO = 6500;
    let indice = 0;
    let temporizador = null;

    // Crear un punto indicador por diapositiva
    const puntos = [];
    slides.forEach((_, i) => {
        const punto = document.createElement('button');
        punto.className = 'hero__punto' + (i === 0 ? ' activo' : '');
        punto.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
        punto.addEventListener('click', () => { irA(i); reiniciar(); });
        contenedorPuntos.appendChild(punto);
        puntos.push(punto);
    });

    function irA(nuevo) {
        indice = (nuevo + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('activo', i === indice));
        puntos.forEach((p, i) => p.classList.toggle('activo', i === indice));
    }

    function siguiente() { irA(indice + 1); }
    function anterior() { irA(indice - 1); }

    function iniciar() {
        if (!temporizador) temporizador = setInterval(siguiente, INTERVALO);
    }
    function detener() {
        clearInterval(temporizador);
        temporizador = null;
    }
    function reiniciar() { detener(); iniciar(); }

    flechaNext.addEventListener('click', () => { siguiente(); reiniciar(); });
    flechaPrev.addEventListener('click', () => { anterior(); reiniciar(); });

    // Pausar cuando el usuario está mirando o interactuando
    hero.addEventListener('mouseenter', detener);
    hero.addEventListener('mouseleave', iniciar);
    hero.addEventListener('focusin', detener);
    hero.addEventListener('focusout', iniciar);

    // Navegación con teclado
    hero.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { anterior(); reiniciar(); }
        if (e.key === 'ArrowRight') { siguiente(); reiniciar(); }
    });

    // Deslizamiento táctil
    let inicioX = null;
    hero.addEventListener('touchstart', (e) => {
        inicioX = e.touches[0].clientX;
    }, { passive: true });
    hero.addEventListener('touchend', (e) => {
        if (inicioX === null) return;
        const delta = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(delta) > 45) {
            delta < 0 ? siguiente() : anterior();
            reiniciar();
        }
        inicioX = null;
    }, { passive: true });

    iniciar();
})();

// ============================================
// APARICIÓN AL HACER SCROLL (reveal)
// ============================================
(function () {
    const elementos = document.querySelectorAll('.revelar');
    if (elementos.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        document.documentElement.classList.add('no-observador');
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    // Pequeño retraso escalonado entre tarjetas vecinas
    elementos.forEach((el, i) => {
        el.style.transitionDelay = ((i % 4) * 90) + 'ms';
        observador.observe(el);
    });
})();

// ============================================
// FILTROS - Todos / Nicho / Árabes / Diseñador
// ============================================
(function () {
    const botones = document.querySelectorAll('.filtro-btn');
    if (botones.length === 0) return;

    const tarjetas = document.querySelectorAll('.producto[data-tipo]');
    const avisoVacio = document.querySelector('.filtros-vacio');

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const filtro = boton.dataset.filtro;

            botones.forEach((b) => {
                b.classList.toggle('activo', b === boton);
                b.setAttribute('aria-pressed', b === boton ? 'true' : 'false');
            });

            let visibles = 0;
            tarjetas.forEach((tarjeta) => {
                const coincide = filtro === 'todos' || tarjeta.dataset.tipo === filtro;
                tarjeta.classList.toggle('filtrado-fuera', !coincide);
                if (coincide) {
                    visibles++;
                    // Re-animar entrada de las tarjetas que quedan
                    tarjeta.classList.remove('visible');
                    setTimeout(() => tarjeta.classList.add('visible'), 30 + (visibles % 8) * 60);
                }
            });

            if (avisoVacio) avisoVacio.hidden = visibles > 0;
        });
    });
})();

// ============================================
// VER MÁS - revela el resto de la colección
// ============================================
(function () {
    const verMasBtn = document.getElementById('ver-mas');
    if (!verMasBtn) return;

    verMasBtn.addEventListener('click', function () {
        const ocultos = document.querySelectorAll('.oculto');
        ocultos.forEach((elemento, i) => {
            elemento.classList.remove('oculto');
            // Entrada escalonada de los productos recién mostrados
            elemento.classList.remove('visible');
            setTimeout(() => elemento.classList.add('visible'), 40 + (i % 8) * 70);
        });
        this.style.display = 'none';
    });
})();
