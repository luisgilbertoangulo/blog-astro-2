import { getCollection, type CollectionEntry } from 'astro:content';
import { BASE_URL } from '../consts';

// Devuelve los artículos publicados, del más reciente al más antiguo.
export async function getSortedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog');
	return posts
		.filter((post) => import.meta.env.DEV || !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Estimación sencilla: unos 200 palabras por minuto de lectura.
export function readingMinutes(post: CollectionEntry<'blog'>): number {
	const words = (post.body ?? '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function getAllTags(posts: CollectionEntry<'blog'>[]): string[] {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) =>
		a.localeCompare(b, 'es'),
	);
}

export function tagPath(tag: string): string {
	return `${BASE_URL}blog/tag/${tag}/`;
}
