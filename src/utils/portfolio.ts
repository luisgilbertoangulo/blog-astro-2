import { getCollection, type CollectionEntry } from 'astro:content';
import { BASE_URL } from '../consts';

export type Project = CollectionEntry<'portfolio'>;

// Destacados primero y, dentro de cada grupo, del más reciente al más antiguo.
export async function getSortedProjects(): Promise<Project[]> {
	const projects = await getCollection('portfolio');
	return projects
		.filter((project) => import.meta.env.DEV || !project.data.draft)
		.sort((a, b) => {
			if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
			return b.data.completedDate.valueOf() - a.data.completedDate.valueOf();
		});
}

export function getAllProjectTags(projects: Project[]): string[] {
	return [...new Set(projects.flatMap((project) => project.data.tags))].sort((a, b) =>
		a.localeCompare(b, 'es'),
	);
}

export function projectPath(project: Project): string {
	return `${BASE_URL}portfolio/${project.id}/`;
}
