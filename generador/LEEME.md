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
| `ficha-tecnica.js` | Calcula el perfil olfativo de cada ficha (acordes, estación, día/noche), los estilos de los filtros y el parecido entre fragancias. |
| `stock.js` | Disponibilidad: qué está agotado o en sus últimas unidades. Lo exporta el portal. |
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
  anio: 2022,                       // opcional: año de lanzamiento
  perfumista: "Nombre Apellido",    // opcional: solo si la marca lo publica
  decants: false,                   // opcional: solo se vende en frasco (por defecto hay decants)
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

## Perfil olfativo

Cada ficha muestra hasta cinco acordes con barras, la afinidad con cada
estación y si funciona mejor de día o de noche. No hay que escribirlo: lo
calcula `ficha-tecnica.js` leyendo la pirámide (`notas`) y la familia.

- Cada nota se compara con un diccionario de acordes (cítrico, floral,
  amaderado, ambarado, oud, cuero, tabaco…). Las notas de fondo pesan más que
  las de salida, y la primera palabra de la familia pesa más que todas.
- Cada acorde tiene una afinidad por estación y momento del día; la suma
  ponderada da los porcentajes.

Si un perfume sale con un acorde raro, casi siempre es porque a una nota le
falta su palabra en `ACORDES` (o le sobra). Se ajusta allí y vale para todo
el catálogo.

## Filtros de las secciones

Además de Nicho / Árabes / Diseñador, cada sección filtra por:

- **Estilo**: Frescos, Florales, Frutales, Dulces, Especiados, Amaderados,
  Ámbar y oud. Agrupan los acordes; un perfume entra en un estilo si uno de
  sus 3 acordes principales pertenece a él.
- **Cuándo**: Clima cálido, Clima frío, De día, De noche, según el clima
  calculado.

Los tres filtros se combinan. Solo aparecen los estilos que existen en esa
sección. Grupos y umbrales: `ESTILOS` y `cuandoDe()` en `ficha-tecnica.js`.

## Sugerencias "Si te gusta…"

Al pie de cada ficha salen las 4 fragancias con acordes más parecidos
(similitud coseno), del mismo público y con stock. Cada tarjeta indica los
acordes que comparten.

## Decants

Cada ficha ofrece Decant 5 ml, Decant 10 ml y Frasco original. El precio del
decant se calcula con `DECANTS` al inicio de `generar.js`:

    precio del frasco / 100 × ml × recargo + atomizador   (redondeado a miles)

Cambia el recargo o el costo del atomizador y se recalcula todo el catálogo.
En el carrito el decant entra como «Nombre · Decant 5 ml».

## Disponibilidad

`stock.js` dice qué está en `"pocas"` (Últimas unidades) o `"agotado"`. Lo
que no aparece está disponible. Los agotados pierden el botón de compra,
salen del riel de novedades y de las sugerencias, y bajan al final de cada
sección.

Se administra desde el portal (sección **Disponibilidad del catálogo**):
marca, exporta `stock.js`, reemplaza este archivo y ejecuta `node generar.js`.

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
