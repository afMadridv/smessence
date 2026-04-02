// ============================================
// CARRUSEL
// ============================================
let index = 0;
const images = document.querySelectorAll('.carrusel-imagenes img');

function mostrarImagen() {
    images.forEach((img, i) => {
        img.classList.remove('activo');
        if (i === index) {
            img.classList.add('activo');
        }
    });
    index = (index + 1) % images.length;
}

if (images.length > 0) {
    setInterval(mostrarImagen, 5500);
}

// ============================================
// GRID - VER MÁS
// ============================================
const verMasBtn = document.getElementById('ver-mas');
if (verMasBtn) {
    verMasBtn.addEventListener('click', function() {
        const elementosOcultos = document.querySelectorAll('.oculto');
        elementosOcultos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });
        this.style.display = 'none';
    });
}