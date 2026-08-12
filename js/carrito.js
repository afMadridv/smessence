// ============================================
// CARRITO - COMPONENTE REUTILIZABLE
// Cada página define window.RUTA_BASE ('' | '../' | '../../')
// y las imágenes se guardan con ruta relativa a la raíz.
// ============================================

const rutaBase = window.RUTA_BASE || '';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// Normalizar entradas antiguas que guardaban '../imagenes/...'
carrito.forEach(p => { p.imagen = p.imagen.replace(/^(\.\.\/)+/, ''); });

function inyectarCarrito() {
    // Inyectar ícono en el header
    const header = document.querySelector('.header');
    if (header && !document.getElementById('carrito-contador')) {
        header.insertAdjacentHTML('beforeend', `
            <div class="carrito-icono" onclick="abrirCarrito()" role="button" aria-label="Abrir carrito" tabindex="0">
                🛒
                <span id="carrito-contador">0</span>
            </div>
        `);
    }

    // Inyectar panel lateral si no existe
    if (!document.getElementById('carrito-panel')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="carrito-panel">
                <div class="carrito-header">
                    <h2>Tu Carrito</h2>
                    <button onclick="cerrarCarrito()" aria-label="Cerrar carrito">✕</button>
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
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, imagenRelativa) {
    // Guardar siempre la ruta canónica desde la raíz del sitio
    const imagen = imagenRelativa.replace(/^(\.\.\/)+/, '');
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
    abrirCarrito();

    // Pulso en el contador como confirmación visual
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
    const totalItems = carrito.reduce((total, p) => total + p.cantidad, 0);
    document.getElementById('carrito-contador').textContent = totalItems;

    const lista = document.getElementById('carrito-lista');
    lista.innerHTML = '';

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    } else {
        carrito.forEach(p => {
            lista.innerHTML += `
                <div class="carrito-item">
                    <img src="${rutaBase}${p.imagen}" alt="${p.nombre}">
                    <div class="carrito-item-info">
                        <p class="carrito-item-nombre">${p.nombre}</p>
                        <p class="carrito-item-precio">$${p.precio.toLocaleString('es-CO')} COP</p>
                        <p class="carrito-item-cantidad">Cantidad: ${p.cantidad}</p>
                    </div>
                    <button class="carrito-item-eliminar" onclick="eliminarDelCarrito('${p.nombre.replace(/'/g, "\\'")}')" aria-label="Eliminar ${p.nombre}">✕</button>
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

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarCarrito();
    });
});
