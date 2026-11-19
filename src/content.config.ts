import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Carga los archivos Markdown y MDX del directorio `src/content/blog/`.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Valida el frontmatter con un esquema.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Convierte la fecha en texto a un objeto Date.
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Texto alternativo de la imagen de cabecera.
			alt: z.string().optional(),
			// Etiquetas en minúsculas, válidas también como segmentos de URL.
			tags: z.array(z.string()).default([]),
			// Los borradores no se publican fuera del servidor de desarrollo.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
