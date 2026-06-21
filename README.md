# Menu digital

Pagina web simple para mostrar el menu corrido del dia de El Pilar del Sabor.

## Como editar el menu

La pagina lee los datos desde Google Sheets:

https://docs.google.com/spreadsheets/d/1qf-x2dVxOgbx6wj4KVyZ2J_0Wdbqr6XKR3uw83g8vQU/edit

El archivo debe tener estas pestanas:

- `Menu`
- `Configuracion`
- `Guia`

## Pestana Menu

Cada fila es un platillo o bebida.

Columnas esperadas:

- `seccion`: agrupa platillos del mismo tiempo.
- `label`: texto pequeno, por ejemplo `Primer tiempo`.
- `titulo`: titulo visible de la tarjeta, por ejemplo `Entrada`.
- `nombre`: nombre del platillo.
- `descripcion`: descripcion corta.
- `disponible`: usa `TRUE` para disponible y `FALSE` para agotado.
- `orden`: posicion dentro de la seccion.

## Pestana Configuracion

Esta pestana controla textos generales de la pagina.

Campos principales:

- `businessName`: nombre que aparece arriba.
- `browserTitle`: texto del titulo de la pestana del navegador.
- `logoAlt`: descripcion del logo para accesibilidad.
- `logoFallback`: iniciales si el logo no carga.
- `tagline`: texto pequeno arriba del nombre.
- `heroTitle`: titulo de la tarjeta principal.
- `priceLabel`: etiqueta antes del precio.
- `price`: precio del menu corrido.
- `includes`: texto de lo que incluye.
- `coursesEyebrow`: texto pequeno arriba de "Comida corrida".
- `coursesTitle`: titulo de la seccion de tiempos.
- `serviceEyebrow`: texto pequeno de la nota inferior.
- `serviceTitle`: titulo de la nota inferior.
- `notes`: texto de la nota inferior.
- `availableText`: etiqueta para platillos disponibles.
- `soldOutText`: etiqueta para platillos agotados.

## Publicar la hoja

Para que GitHub Pages pueda leer Google Sheets, la hoja debe estar accesible:

1. En Google Sheets, abre `Compartir`.
2. Cambia el acceso a `Cualquier persona con el enlace`.
3. Deja el permiso como `Lector`.

Si la hoja no esta accesible, la pagina usara el menu local de respaldo que esta dentro de `script.js`.

## Logo

Coloca el logo en:

```text
assets/logo.jpeg
```

Si el archivo no existe, la pagina muestra un circulo con las iniciales `MC`.
