# Fotos reales de producto

Suelta aquí las fotos de los frascos y el sitio las usará en lugar del packshot
vectorial. No hay que tocar código.

## Cómo se conecta una foto

El nombre del archivo debe ser el **identificador del perfume** más la extensión.
El identificador es el mismo que aparece en la URL de su ficha:

```
borrador/pages/producto/khamrah.html   ->   identificador: khamrah
```

Entonces la foto va como:

```
borrador/imagenes/productos/khamrah.jpg
```

Formatos aceptados, en orden de preferencia: `.webp`, `.png`, `.jpg`, `.jpeg`.
Si existen varios, gana el primero de esa lista.

## Cómo aplicar los cambios

Después de copiar las fotos, ejecuta el generador:

```bash
node generar.js
```

Vuelve a construir el sitio y cada perfume que tenga foto la usará
automáticamente. Los que no la tengan siguen con su packshot vectorial, así que
puedes ir agregando fotos de a pocas sin romper nada.

## Recomendaciones para las fotos

- **Fondo blanco puro** y frasco centrado, con aire alrededor.
- **Cuadradas o casi** (por ejemplo 1200 × 1400 px). El sitio las encaja en un
  marco con proporción 4 : 4.6.
- **Mínimo 800 px de lado.** Por debajo se ven borrosas en pantallas retina.
- Formato `.webp` si puedes: pesa la mitad que un `.jpg` con la misma calidad.

## De dónde sacar fotos que sí puedes usar

1. **Tu proveedor o distribuidor autorizado.** Casi todas las casas entregan un
   kit de medios con packshots sobre fondo blanco a quienes revenden sus
   productos. Es gratis y son las mismas fotos que usan las grandes cadenas.
2. **Fotografía propia.** Fondo de papel blanco, luz de ventana difusa, un
   cartón blanco al lado opuesto para rebotar la luz, y el celular en HDR.
   Es la opción que más conviene a mediano plazo: las fotos son tuyas.
3. **Bancos de imagen con licencia comercial** para packshots por SKU.

No uses fotos tomadas de otras tiendas ni de bases de datos de fragancias:
tienen derechos de autor y usarlas en una tienda que compite con ellas expone
el negocio a un reclamo.
