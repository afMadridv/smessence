//CARRUSEL


let index = 0;
const images = document.querySelectorAll('.carrusel-imagenes img');

function mostrarImagen() {
    images.forEach((img, i) => {
        img.classList.remove('activo'); // Elimina la clase activa de todas las imágenes
        if (i === index) {
            img.classList.add('activo'); // Agrega la clase activa a la imagen actual
        }
    });
    index = (index + 1) % images.length; // Incrementa el índice y reinicia si es necesario
}

setInterval(mostrarImagen, 5500); // Cambia la imagen cada 5.5 segundos


//Grid oculto
document.getElementById('ver-mas').addEventListener('click', function() {
    const elementosOcultos = document.querySelectorAll('.oculto');
    elementosOcultos.forEach(function(elemento) {
        elemento.style.display = 'block'; // Muestra los elementos ocultos
    });
    this.style.display = 'none'; // Oculta el botón después de hacer clic
});