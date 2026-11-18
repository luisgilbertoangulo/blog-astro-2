// Datos globales del sitio. Se pueden importar desde cualquier archivo con `import`.

export const SITE_TITLE = 'El blog de Luis';
export const SITE_DESCRIPTION = 'Apuntes de desarrollo web: HTML, CSS, JavaScript, Astro y Git';
export const AUTHOR = 'Luis Gilberto Angulo';

// Astro normaliza este valor con barra final: '/blog-astro-2/' en producción,
// '/' cuando no hay base configurada. Se usa para prefijar los enlaces internos.
export const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`;
