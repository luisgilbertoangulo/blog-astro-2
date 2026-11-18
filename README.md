# El blog de Luis

Blog personal sobre desarrollo web, creado con la plantilla de blog de [Astro](https://astro.build/) y publicado en GitHub Pages.

## Qué contiene

- Artículos en Markdown y MDX, con esquema validado en `src/content.config.ts`.
- Feed RSS, sitemap, metadatos Open Graph y fuentes locales.
- Despliegue automático en GitHub Pages mediante GitHub Actions.

## Estructura del proyecto

```text
src/
├── assets/       # imágenes y fuentes que optimiza Astro
├── components/   # BaseHead, Header, HeaderLink, Footer, FormattedDate
├── content/blog/ # artículos del blog (.md y .mdx)
├── layouts/      # BlogPost y PageLayout
├── pages/        # rutas del sitio
└── styles/       # estilos globales
public/           # favicon y otros archivos estáticos
.github/workflows # flujo de despliegue
```

Astro crea una ruta por cada archivo de `src/pages/`. Los artículos se leen desde `src/content/blog/` y se renderizan en `src/pages/blog/[...slug].astro`.

## Comandos

| Comando              | Acción                                                  |
| -------------------- | ------------------------------------------------------- |
| `npm install`        | Instala las dependencias.                               |
| `npm run dev`        | Inicia el servidor de desarrollo en `localhost:4321`.   |
| `npm run build`      | Genera el sitio en `./dist/`.                           |
| `npm run preview`    | Previsualiza la compilación localmente.                 |
| `npx astro check`    | Revisa tipos y errores en los componentes.              |

El proyecto sigue las instrucciones de `AGENTS.md`: el servidor de desarrollo se inicia con `astro dev --background` y se gestiona con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Despliegue en GitHub Pages

El sitio se publica en <https://luisgilbertoangulo.github.io/blog-astro-2/>.

- En `astro.config.mjs`, `site` es `https://luisgilbertoangulo.github.io` y `base` es `/blog-astro-2`.
- Los enlaces internos usan `import.meta.env.BASE_URL` para funcionar tanto en desarrollo como bajo esa ruta.
- `.github/workflows/deploy.yml` compila y despliega en cada `push` a `master`.
- En GitHub hay que tener **Settings → Pages → Source: GitHub Actions**.

Para publicar un cambio basta con hacer commit y push a `master`.
