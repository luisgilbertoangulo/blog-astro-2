---
title: "Accesibilidad web sin complicaciones"
description: "Buenas prácticas sencillas para que tus páginas sean utilizables por todo el mundo."
pubDate: "2026-08-30"
heroImage: "../../assets/blog-placeholder-1.jpg"
alt: "Astronauta flotando sobre la Tierra durante un paseo espacial"
tags: ["accesibilidad"]
---

La accesibilidad no es una funcionalidad opcional que se añade al final. Son decisiones pequeñas tomadas desde el principio que mejoran la experiencia de todas las personas.

## Empieza por lo básico

1. Declara el idioma: `<html lang="es">`.
2. Usa encabezados en orden: una sola `<h1>` y después `<h2>`, `<h3>`...
3. Da texto alternativo a las imágenes que aportan información.
4. Asocia cada campo de formulario con su `<label>`.
5. Comprueba el contraste de colores.

```html
<label for="correo">Correo electrónico</label>
<input id="correo" type="email" name="correo" required />
```

Si una imagen es decorativa, `alt=""` es correcto: así los lectores de pantalla saben que deben ignorarla.

## Navegación con teclado

Todo lo que se puede hacer con el ratón debe poder hacerse con el teclado. Prueba a recorrer tu página con <kbd>Tab</kbd>: el foco debe ser visible y seguir un orden lógico.

```css
:focus-visible {
  outline: 3px solid #2337ff;
  outline-offset: 2px;
}
```

Nunca elimines el contorno de foco sin ofrecer otro indicador equivalente.

## No te fiés solo del color

Un botón rojo para "eliminar" y verde para "guardar" no funciona si alguien no distingue esos colores. Añade siempre texto o iconos que expliquen la acción.

## Herramientas para revisar

- El inspector de accesibilidad de Chrome o Firefox.
- Lighthouse, que incluye una puntuación de accesibilidad.
- Navegar solo con teclado y, si puedes, con un lector de pantalla.

Corregir un par de problemas por artículo es suficiente para ir mejorando poco a poco.
