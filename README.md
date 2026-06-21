# Menú digital

Página web simple para mostrar el menú corrido del día.

## Cómo editar el menú

Por ahora los datos están en `script.js`, dentro de `menuData`.

Puedes cambiar:

- `businessName`: nombre que aparece arriba.
- `browserTitle`: texto del titulo de la pestana del navegador.
- `logoAlt`: descripcion del logo para accesibilidad.
- `logoFallback`: iniciales si el logo no carga.
- `tagline`: texto pequeno arriba del nombre.
- `heroTitle`: titulo de la tarjeta principal.
- `priceLabel`: etiqueta antes del precio.
- `price`: precio del menú corrido.
- `includes`: texto de lo que incluye.
- `coursesEyebrow`: texto pequeno arriba de "Comida corrida".
- `coursesTitle`: titulo de la seccion de tiempos.
- `serviceEyebrow`: texto pequeno de la nota inferior.
- `serviceTitle`: titulo de la nota inferior.
- `notes`: texto de la nota inferior.
- `availableText`: etiqueta para platillos disponibles.
- `soldOutText`: etiqueta para platillos agotados.
- `courses`: secciones del menu.
- `available`: cambia entre `true` y `false` para mostrar disponible o agotado.

## Logo

Coloca el logo en:

```text
assets/logo.jpeg
```

Si el archivo no existe, la página muestra un círculo con las iniciales `MC`.

## Siguiente paso

Cuando tengas tu Google Sheet, se puede cambiar `script.js` para que lea los datos desde la hoja y ya no tengas que editar el archivo a mano.
