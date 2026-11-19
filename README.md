# El blog de Luis

Blog personal sobre desarrollo web, creado con la plantilla de blog de [Astro](https://astro.build/) y publicado en GitHub Pages.

## Qué contiene

- Artículos en Markdown y MDX, con esquema validado en `src/content.config.ts`.
- Etiquetas (páginas en `/blog/tag/`), tiempo de lectura, extractos, tabla de contenidos y navegación entre artículos.
- Los artículos con `draft: true` solo se ven en el servidor de desarrollo.
- Feed RSS, sitemap, robots.txt, datos estructurados y fuentes locales.
- Despliegue automático en GitHub Pages; el flujo ejecuta `astro check` antes de compilar.

## Estructura del proyecto

```text
src/
├── assets/       # imágenes y fuentes que optimiza Astro
├── components/   # BaseHead, Header, PostCard, PostList, Tags, etc.
├── content/blog/ # artículos del blog (.md y .mdx)
├── layouts/      # BaseLayout, BlogPost y PageLayout
├── pages/        # rutas del sitio, tag/[tag] y 404
├── styles/       # estilos globales
└── utils/        # ordenación, lectura y etiquetas de artículos
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

## Imágenes

Las cabeceras de los artículos son fotografías de la NASA, de dominio público (sin regalías), recortadas a 2:1 y guardadas en `src/assets/`:

| Archivo                    | Imagen (ID de NASA)                       |
| -------------------------- | ----------------------------------------- |
| `blog-placeholder-1.jpg`   | `iss059e002710` (paseo espacial)          |
| `blog-placeholder-2.jpg`   | `iss036e036601` (horizonte lunar)         |
| `blog-placeholder-3.jpg`   | `PIA03096` (Montañas de la Creación)      |
| `blog-placeholder-4.jpg`   | `KSC-00pp1804` (lanzamiento nocturno)     |
| `blog-placeholder-5.jpg`   | `as11-40-5948` (Apollo 11 en la Luna)     |

## Despliegue en GitHub Pages

El sitio se publica en <https://luisgilbertoangulo.github.io/blog-astro-2/>.

- En `astro.config.mjs`, `site` es `https://luisgilbertoangulo.github.io` y `base` es `/blog-astro-2`.
- Los enlaces internos usan `import.meta.env.BASE_URL` para funcionar tanto en desarrollo como bajo esa ruta.
- `.github/workflows/deploy.yml` compila y despliega en cada `push` a `master`.
- En GitHub hay que tener **Settings → Pages → Source: GitHub Actions**.

Para publicar un cambio basta con hacer commit y push a `master`.
