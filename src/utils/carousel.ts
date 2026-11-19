import type { ImageMetadata } from 'astro';
import { BASE_URL } from '../consts';
import type { CollectionEntry } from 'astro:content';

export interface CarouselItem {
	kind: 'project' | 'post';
	title: string;
	description: string;
	date: Date;
	url: string;
	externalUrl?: string;
	repo?: string;
	role?: string;
	image?: ImageMetadata;
	imageUrl?: string;
	imageAlt: string;
	tags: string[];
}

export function postToCarouselItem(post: CollectionEntry<'blog'>): CarouselItem {
	return {
		kind: 'post',
		title: post.data.title,
		description: post.data.description,
		date: post.data.pubDate,
		url: `${BASE_URL}blog/${post.id}/`,
		image: post.data.heroImage,
		imageAlt: post.data.alt ?? '',
		tags: post.data.tags,
	};
}

export function projectToCarouselItem(project: CollectionEntry<'portfolio'>): CarouselItem {
	return {
		kind: 'project',
		title: project.data.title,
		description: project.data.description,
		date: project.data.completedDate,
		url: `${BASE_URL}portfolio/${project.id}/`,
		externalUrl: project.data.url,
		repo: project.data.repo,
		role: project.data.role,
		imageUrl: project.data.image,
		imageAlt: project.data.imageAlt,
		tags: project.data.tags,
	};
}

export interface CarouselStep {
	item: CarouselItem;
	divider?: string;
}

const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });

// Inserta una etiqueta de mes cada vez que cambia el período.
export function buildCarouselSteps(items: CarouselItem[]): CarouselStep[] {
	const steps: CarouselStep[] = [];
	let previousMonth = '';

	for (const item of items) {
		const month = monthFormatter.format(item.date);
		if (month !== previousMonth) {
			steps.push({
				item,
				divider: month.charAt(0).toUpperCase() + month.slice(1),
			});
			previousMonth = month;
		} else {
			steps.push({ item });
		}
	}

	return steps;
}
