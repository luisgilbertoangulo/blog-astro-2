---
title: "Git y GitHub: el flujo básico"
description: "Comandos esenciales de Git y cómo subir un proyecto a GitHub desde cero."
pubDate: "2026-09-18"
heroImage: "../../assets/blog-placeholder-2.jpg"
alt: "Paisaje de colinas cálidas al atardecer"
tags: ["git"]
---

Git guarda la historia de tu proyecto; GitHub es un lugar donde alojar esa historia y colaborar. Son cosas distintas, aunque se usen juntas.

## Iniciar un repositorio

```sh
git init
git status
```

`git status` es tu mejor amigo: siempre te dice qué archivos han cambiado y cuáles están preparados.

## El ciclo de cada cambio

```sh
git add .
git commit -m "Añadir página de contacto"
git push
```

Tres pasos: preparar los cambios, crear un commit con un mensaje descriptivo y subirlos al remoto. Escribe mensajes en imperativo y que expliquen *qué* cambios y *por qué*, no solo "arreglos".

## Conectar con GitHub

Cuando el repo ya existe en GitHub:

```sh
git remote add origin https://github.com/tu-usuario/tu-repo.git
git branch -M main
git push -u origin main
```

El `-u` deja configurada la rama upstream, de modo que los siguientes `git push` no necesiten argumentos.

## Ramas y pull requests

Para probar algo sin afectar a la rama principal:

```sh
git switch -c nueva-funcion
# ... cambios, add y commit ...
git switch main
git merge nueva-funcion
```

En GitHub, una *pull request* es una petición para integrar tus cambios. Permite revisar el diff, comentar y ejecutar comprobaciones automáticas antes de fusionar.

## Este blog

Este sitio se publica en GitHub Pages mediante una GitHub Action: cada `push` a `master` compila el proyecto con Astro y despliega `dist/`. No hay que subir archivos a mano.
