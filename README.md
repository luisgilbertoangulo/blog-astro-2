# El blog de Luis

Blog personal sobre desarrollo web, creado con la plantilla de blog de [Astro](https://astro.build/) y publicado en GitHub Pages.

## Qué contiene

- Artículos en Markdown y MDX, con esquema validado en `src/content.config.ts`.
- Etiquetas (páginas en `/blog/tag/`), tiempo de lectura, extractos, tabla de contenidos y navegación entre artículos.
- Portafolio en `/portfolio/`: lista los repositorios públicos de GitHub y permite completarlos con fichas propias; cada proyecto tiene su propia página.
- Currículum en `/cv/`, con el PDF para descargar y un código QR que apunta directamente al archivo.
- Carrusel en el inicio con pestañas Proyectos/Artículos, separadores por mes, animación «órbita de fechas» y avance automático que se pausa al interactuar y respeta `prefers-reduced-motion`.
- Los artículos y proyectos con `draft: true` solo se ven en el servidor de desarrollo; las fichas de ejemplo del portafolio son borradores.
- Feed RSS, sitemap, robots.txt, datos estructurados y fuentes locales.
- Despliegue automático en GitHub Pages; el flujo ejecuta `astro check` antes de compilar.

## Estructura del proyecto

```text
src/
├── assets/       # imágenes y fuentes que optimiza Astro
├── components/       # BaseHead, Header, PostCard, ProjectCard, Carousel, etc.
├── content/blog/     # artículos del blog (.md y .mdx)
├── content/portfolio/# fichas de proyectos (.md y .mdx)
├── layouts/          # BaseLayout, BlogPost y PageLayout
├── pages/            # rutas del sitio, blog, portfolio, cv y 404
├── styles/           # estilos globales
└── utils/            # artículos, proyectos, carrusel y JSON-LD
public/           # favicon, PDF del currículum y otros archivos estáticos
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

## Portafolio desde GitHub

Durante la compilación, `src/utils/github.ts` consulta la API de GitHub y convierte los repositorios públicos en proyectos del portafolio: nombre, descripción, homepage, lenguaje, temas, estrellas y fechas de creación y última actualización. La imagen es la tarjeta automática que genera GitHub (`opengraph.githubassets.com`), no una captura real del proyecto.

La lista se actualiza al redesplegar el sitio. En GitHub Actions se usa `GITHUB_TOKEN` (disponible automáticamente) para no depender del límite de peticiones anónimas; en local funciona sin token. Si la API falla, el build continúa y se muestra un aviso en la consola.

Para añadir detalles a un repo, crea una ficha en `src/content/portfolio/` con el mismo nombre que el repositorio (por ejemplo, `web-contacto.md`) y `draft: false`. Sus campos sobrescriben los datos de GitHub y su texto Markdown aparece en la página del proyecto.

## Currículum

El PDF se llama `Curriculum Informatica VITAE 2026.pdf` y vive en `public/`. Si quieres sustituirlo, mantén ese nombre exacto: la página `/cv/` comprueba en tiempo de compilación que el archivo existe y solo muestra el botón y el QR cuando está presente.

El código QR se genera durante el build con la dependencia `qrcode` y codifica la URL pública absoluta del PDF (con los espacios convertidos en `%20`), así que no depende de servicios externos ni de `localhost`.

## Despliegue en GitHub Pages

El sitio se publica en <https://luisgilbertoangulo.github.io/blog-astro-2/>.

- En `astro.config.mjs`, `site` es `https://luisgilbertoangulo.github.io` y `base` es `/blog-astro-2`.
- Los enlaces internos usan `import.meta.env.BASE_URL` para funcionar tanto en desarrollo como bajo esa ruta.
- `.github/workflows/deploy.yml` compila y despliega en cada `push` a `master`.
- En GitHub hay que tener **Settings → Pages → Source: GitHub Actions**.

Para publicar un cambio basta con hacer commit y push a `master`.
