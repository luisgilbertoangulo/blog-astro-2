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

// Proyectos del portafolio. Las fotos son URLs externas, no archivos locales.
const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			// Fecha en que se redactó la ficha.
			writtenDate: z.coerce.date(),
			// Fecha en que se realizó el proyecto.
			completedDate: z.coerce.date(),
			url: z.url().optional(),
			repo: z.url().optional(),
			role: z.string().optional(),
			image: z.url().optional(),
			imageAlt: z.string().default(''),
			imageWidth: z.number().int().positive().optional(),
			imageHeight: z.number().int().positive().optional(),
			tags: z.array(z.string()).default([]),
			featured: z.boolean().default(false),
			draft: z.boolean().default(false),
		})
		.refine((data) => !data.image || data.imageAlt.trim().length > 0, {
			message: 'imageAlt es obligatoria cuando se indica una imagen',
			path: ['imageAlt'],
		}),
});

export const collections = { blog, portfolio };
