---
title: "HTML y CSS desde cero"
description: "Las bases de la web: HTML semántico, modelo de caja y los primeros pasos con CSS."
pubDate: "2026-10-20"
heroImage: "../../assets/blog-placeholder-3.jpg"
alt: "Pilares de gas y polvo donde nacen estrellas, vistos por el telescopio Spitzer de la NASA"
tags: ["html", "css"]
---

Toda página web, por compleja que sea, se acaba convirtiendo en HTML y CSS. El HTML aporta la estructura y el significado; el CSS se encarga del aspecto. Tener claras estas dos capas es el mejor punto de partida.

## Escribe HTML con significado

No se trata solo de que se vea bien, sino de que el navegador, los lectores de pantalla y los motores de búsqueda entiendan qué es cada parte:

```html
<article>
  <header>
    <h1>HTML y CSS desde cero</h1>
    <p>Publicado el 20 de octubre de 2026</p>
  </header>
  <main>
    <p>Contenido del artículo...</p>
  </main>
</article>
```

Etiquetas como `<article>`, `<header>`, `<nav>` o `<main>` son semánticas: describen el papel de cada bloque. Usar siempre `<div>` es válido, pero pierdes información útil.

## El modelo de caja

Cada elemento es una caja con cuatro zonas: contenido, padding, borde y margin. El `width` por defecto se aplica solo al contenido, algo que suele confundir al principio:

```css
* {
  box-sizing: border-box;
}

.tarjeta {
  width: 300px;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
}
```

Con `box-sizing: border-box`, el ancho incluye padding y borde, y resulta mucho más fácil calcular tamaños.

## Maquetación con Flexbox y Grid

- **Flexbox** va bien para distribuir elementos en una sola fila o columna: barras de navegación, listas, botones.
- **Grid** está pensado para layouts en dos dimensiones: cabecera, barra lateral, contenido y pie de página.

```css
.contenedor {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
}
```

Como regla práctica: usa Grid para la estructura general y Flexbox para alinear los elementos dentro de cada zona.

## Siguiente paso

Crea una página pequeña, añade un `<style>` y juega con `gap`, `padding` y `grid-template-columns`. Cambiar valores y ver el resultado es la forma más rápida de entender CSS.
