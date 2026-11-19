import { getCollection, type CollectionEntry } from 'astro:content';
import { BASE_URL } from '../consts';
import { getGitHubRepos, githubPreviewImage, type GitHubRepo } from './github';

export type ManualProject = CollectionEntry<'portfolio'>;

export interface ProjectData {
	title: string;
	description: string;
	writtenDate: Date;
	completedDate: Date;
	url?: string;
	repo?: string;
	role?: string;
	image?: string;
	imageAlt: string;
	imageWidth?: number;
	imageHeight?: number;
	tags: string[];
	featured: boolean;
	source: 'github' | 'manual';
	stars?: number;
	language?: string;
}

export interface ProjectView {
	id: string;
	data: ProjectData;
	// Las fichas manuales tienen contenido Markdown; los repos de GitHub no.
	entry?: ManualProject;
}

function formatRepoTitle(name: string): string {
	return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function httpURL(value?: string | null): string | undefined {
	return value && /^https?:\/\//i.test(value) ? value : undefined;
}

function projectFromRepo(repo: GitHubRepo): ProjectView {
	const tags = [repo.language, ...repo.topics].filter(
		(tag): tag is string => Boolean(tag && tag.trim()),
	);

	return {
		id: repo.name,
		data: {
			title: formatRepoTitle(repo.name),
			description: repo.description?.trim() || 'Sin descripción en el repositorio.',
			writtenDate: new Date(repo.created_at),
			completedDate: new Date(repo.pushed_at),
			url: httpURL(repo.homepage),
			repo: repo.html_url,
			image: githubPreviewImage(repo.name),
			imageAlt: `Vista previa del repositorio ${repo.name} en GitHub`,
			tags: [...new Set(tags)],
			featured: false,
			source: 'github',
			stars: repo.stargazers_count,
			language: repo.language ?? undefined,
		},
	};
}

function projectFromEntry(entry: ManualProject): ProjectView {
	const { data } = entry;
	return {
		id: entry.id,
		data: {
			title: data.title,
			description: data.description,
			writtenDate: data.writtenDate,
			completedDate: data.completedDate,
			url: data.url,
			repo: data.repo,
			role: data.role,
			image: data.image,
			imageAlt: data.imageAlt,
			imageWidth: data.imageWidth,
			imageHeight: data.imageHeight,
			tags: data.tags,
			featured: data.featured,
			source: 'manual',
		},
		entry,
	};
}

// Una ficha manual con el mismo nombre que el repo sustituye los datos automáticos.
function mergeManual(project: ProjectView, entry?: ManualProject): ProjectView {
	if (!entry) return project;
	const manual = projectFromEntry(entry).data;

	return {
		id: project.id,
		entry,
		data: {
			...project.data,
			...manual,
			url: manual.url ?? project.data.url,
			repo: manual.repo ?? project.data.repo,
			image: manual.image ?? project.data.image,
			imageAlt: manual.imageAlt || project.data.imageAlt,
			imageWidth: manual.imageWidth ?? project.data.imageWidth,
			imageHeight: manual.imageHeight ?? project.data.imageHeight,
			tags: manual.tags.length > 0 ? manual.tags : project.data.tags,
			stars: project.data.stars,
			language: project.data.language,
		},
	};
}

// Repos públicos de GitHub + fichas manuales. Destacados primero, luego por fecha de actualización.
export async function getSortedProjects(): Promise<ProjectView[]> {
	const [repos, allEntries] = await Promise.all([
		getGitHubRepos(),
		getCollection('portfolio'),
	]);
	const entries = allEntries.filter((entry) => import.meta.env.DEV || !entry.data.draft);
	const entryById = new Map(entries.map((entry) => [entry.id, entry]));
	const repoNames = new Set(repos.map((repo) => repo.name));

	const projects = [
		...repos.map((repo) => mergeManual(projectFromRepo(repo), entryById.get(repo.name))),
		...entries.filter((entry) => !repoNames.has(entry.id)).map(projectFromEntry),
	];

	return projects.sort((a, b) => {
		if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
		return b.data.completedDate.valueOf() - a.data.completedDate.valueOf();
	});
}

export function getAllProjectTags(projects: ProjectView[]): string[] {
	return [...new Set(projects.flatMap((project) => project.data.tags))].sort((a, b) =>
		a.localeCompare(b, 'es'),
	);
}

export function projectPath(project: ProjectView): string {
	return `${BASE_URL}portfolio/${project.id}/`;
}
