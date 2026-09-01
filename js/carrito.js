/* ============================================
   CARRITO
   Cada página define window.RUTA_BASE ('', '../', '../../')
   apuntando a la raíz del sitio.
   La imagen se guarda como clave:
     'frascos/xxx.svg'   → packshot vectorial
     'productos/xxx.jpg' → foto real aportada por la tienda
     'xxx.jpg'           → foto heredada en imagenes/
   ============================================ */

const rutaBase = window.RUTA_BASE || '';

const resolverImagen = (clave) => /^(frascos|productos)\//.test(clave)
    ? rutaBase + 'imagenes/' + clave
    : rutaBase + 'imagenes/' + clave;

let carrito = JSON.parse(localStorage.getItem('carrito_borrador')) || [];

function inyectarCarrito() {
    const cabecera = document.querySelector('.cabecera');
    if (cabecera && !document.getElementById('carrito-contador')) {
        cabecera.insertAdjacentHTML('beforeend', `
            <div class="carrito-icono" onclick="abrirCarrito()" role="button" aria-label="Abrir carrito" tabindex="0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span id="carrito-contador">0</span>
            </div>
        `);
    }

    if (!document.getElementById('carrito-panel')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="carrito-panel">
                <div class="carrito-header">
                    <h2>Tu Carrito</h2>
                    <button onclick="cerrarCarrito()" aria-label="Cerrar carrito">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <div id="carrito-lista">
                    <p class="carrito-vacio">Tu carrito está vacío</p>
                </div>
                <div class="carrito-footer">
                    <p>Total: <span id="carrito-total">$0 COP</span></p>
                    <button class="carrito-btn-comprar">Finalizar compra</button>
                    <button class="carrito-btn-limpiar" onclick="limpiarCarrito()">Limpiar carrito</button>
                </div>
            </div>
            <div id="carrito-overlay" onclick="cerrarCarrito()"></div>
        `);
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito_borrador', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, imagen) {
    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
    abrirCarrito();

    const contador = document.getElementById('carrito-contador');
    if (contador) {
        contador.classList.remove('late');
        void contador.offsetWidth;
        contador.classList.add('late');
    }
}

function limpiarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    cerrarCarrito();
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    guardarCarrito();
    actualizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, p) => total + (p.precio * p.cantidad), 0);
}

function actualizarCarrito() {
    document.getElementById('carrito-contador').textContent =
        carrito.reduce((total, p) => total + p.cantidad, 0);

    const lista = document.getElementById('carrito-lista');
    lista.innerHTML = '';

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    } else {
        carrito.forEach(p => {
            lista.innerHTML += `
                <div class="carrito-item">
                    <img src="${resolverImagen(p.imagen)}" alt="${p.nombre}">
                    <div class="carrito-item-info">
                        <p class="carrito-item-nombre">${p.nombre}</p>
                        <p class="carrito-item-precio">$${p.precio.toLocaleString('es-CO')} COP</p>
                        <p class="carrito-item-cantidad">Cantidad: ${p.cantidad}</p>
                    </div>
                    <button class="carrito-item-eliminar" onclick="eliminarDelCarrito('${p.nombre.replace(/'/g, "\\'")}')" aria-label="Eliminar ${p.nombre}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            `;
        });
    }

    document.getElementById('carrito-total').textContent =
        '$' + calcularTotal().toLocaleString('es-CO') + ' COP';
}

function abrirCarrito() {
    document.getElementById('carrito-panel').classList.add('abierto');
    document.getElementById('carrito-overlay').style.display = 'block';
}

function cerrarCarrito() {
    document.getElementById('carrito-panel').classList.remove('abierto');
    document.getElementById('carrito-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    inyectarCarrito();
    actualizarCarrito();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarCarrito();
    });
});
