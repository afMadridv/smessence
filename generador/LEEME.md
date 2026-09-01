# Generador del sitio

El sitio de Smessence es HTML estático, pero no se edita a mano: se genera
desde aquí. Cambia los datos, ejecuta un comando y se reconstruyen la portada,
las secciones, las 157 fichas, los packshots y el índice de búsqueda.

## Uso

```bash
cd generador
node generar.js
```

No necesita instalar nada: solo Node.js.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `datos.js` | **El catálogo.** Las 148 fragancias y los 9 combos. Es la fuente única de verdad. |
| `frascos.js` | Dibuja los packshots vectoriales: 15 siluetas de frasco, tapas metálicas y placa grabada. |
| `generar.js` | Las plantillas de página y la escritura de archivos. |
| `datos-portal.js` | Opcional. El que descarga el portal de gestión; si está, sus fragancias se suman al catálogo. |

## Agregar una fragancia

Dos caminos, según prefieras.

**Desde el portal** (`pages/portal.html` en el sitio): llena el formulario,
exporta el archivo, déjalo en esta carpeta y ejecuta `node generar.js`.

**A mano**: añade un objeto al arreglo `PERFUMES` de `datos.js`. Campos:

```js
{
  id: "khamrah",                    // identificador: nombre del archivo y de la foto
  nombre: "Khamrah",
  marca: "Lattafa",
  genero: "u",                      // "m" masculino · "f" femenino · "u" unisex
  tipo: "arabe",                    // "disenador" · "arabe" · "nicho"
  precio: 155000,                   // en pesos, sin puntos
  destacado: true,                  // opcional: lo muestra en el riel de novedades
  familia: "Gourmand especiado · Eau de Parfum",
  desc: ["Primer párrafo.", "Segundo párrafo."],
  notas: { salida: "…", corazon: "…", fondo: "…" },
  ocasion: "Noches frías y planes especiales.",
  duracion: "Muy alta: 8 a 12 horas.",

  // Una de estas dos, no las dos:
  foto: "khamrah.jpg",              // usa imagenes/khamrah.jpg
  frasco: { forma: "cofre", vidrio: "#1A1A1C", vidrio2: "#000000", tapa: "oro", acento: "#C9AE7F" }
}
```

Si existe `imagenes/productos/<id>.<ext>`, esa fotografía manda sobre `foto`
y sobre `frasco`. Es la vía para ir reemplazando packshots por fotos reales
sin tocar los datos.

Formas de frasco disponibles: `rect`, `torre`, `flacon`, `cofre`, `gota`,
`diamante`, `urna`, `anfora`, `redondo`, `trofeo`, `plano`, `busto`, `robot`,
`rayo`, `apotecario`. Tapas: `oro`, `plata`, `negro`, `rojo`.

## Cómo se reparte el catálogo

Cada fragancia aparece en las secciones que le corresponden según su género y
su tipo de perfumería:

| Sección | Aparece si |
|---|---|
| Masculinas | género `m` o `u` |
| Femeninas | género `f` o `u` |
| Árabes | tipo `arabe` |
| Nicho | tipo `nicho` |
| Catálogo de la portada | siempre |

El tipo alimenta además los filtros de todas las secciones. El portal de
gestión muestra este mismo reparto en vivo mientras registras la fragancia.

## Qué NO se genera

Estos archivos se editan a mano y el generador no los toca:

- `css/estilo.css` y `css/portal.css`
- `js/app.js`, `js/carrito.js`, `js/portal.js`
- `pages/portal.html`
- Las fotografías de `imagenes/`

`js/indice.js` sí se genera: no lo edites, se sobrescribe en cada ejecución.
