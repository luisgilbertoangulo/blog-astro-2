---
title: "JavaScript moderno en la práctica"
description: "let y const, funciones flecha, destructuración y async/await con ejemplos sencillos."
pubDate: "2026-10-05"
heroImage: "../../assets/blog-placeholder-4.jpg"
alt: "Paisaje verde con colinas, árboles y nubes"
---

JavaScript ha cambiado mucho desde los tiempos de `var` y callbacks anidados. Hoy contamos con una sintaxis más clara que conviene conocer aunque no uses frameworks.

## `let`, `const` y nada de `var`

Por defecto usa `const`. Si la variable va a cambiar de valor, usa `let`:

```js
const titulo = "JavaScript moderno";
let contador = 0;

contador += 1;
```

`const` evita reasignaciones accidentales y hace más fácil leer el código.

## Funciones flecha

```js
const duplicar = (numero) => numero * 2;

const saludar = (nombre) => {
  return `Hola, ${nombre}`;
};
```

Cuando la función es una sola expresión, puedes devolver el resultado directamente. Para cuerpos más largos, usa llaves y `return`.

## Destructuración

Permite extraer valores de objetos y arrays con menos código:

```js
const articulo = { titulo: "Astro", autor: "Luis", annio: 2026 };
const { titulo, autor } = articulo;

const colores = ["rojo", "verde", "azul"];
const [primero, , tercero] = colores;
```

## Promesas y `async`/`await`

Las peticiones asíncronas se leen casi como código secuencial:

```js
async function cargarArticulos() {
  try {
    const respuesta = await fetch("/api/articulos");
    if (!respuesta.ok) throw new Error("No se pudieron cargar");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

Recuerda que `await` solo se puede usar dentro de una función `async` (o en un módulo con `top-level await`).

## Un consejo final

No intentes memorizar toda la sintaxis. Elige un proyecto pequeño, escribe código cada día y consulta la documentación cuando tengas dudas. La práctica hace que estas formas se vuelvan naturales.
