import { GITHUB_OWNER } from '../consts';

// Solo los campos que necesitamos de la API de GitHub.
export interface GitHubRepo {
	name: string;
	description: string | null;
	homepage: string | null;
	html_url: string;
	language: string | null;
	topics: string[];
	created_at: string;
	pushed_at: string;
	stargazers_count: number;
	fork: boolean;
	private: boolean;
}

let reposPromise: Promise<GitHubRepo[]> | undefined;

async function loadRepos(): Promise<GitHubRepo[]> {
	// En GitHub Actions el token existe automáticamente; en local se puede usar sin él.
	const token = process.env.GITHUB_TOKEN;

	try {
		const response = await fetch(
			`https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&type=owner&sort=updated`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub devolvió ${response.status} ${response.statusText}`);
		}

		const repos = (await response.json()) as GitHubRepo[];
		return repos.filter((repo) => !repo.fork && !repo.private);
	} catch (error) {
		// Un fallo de red o de límite de peticiones no debe romper la compilación.
		console.warn('[github] No se pudieron cargar los repositorios:', error);
		return [];
	}
}

// Se reutiliza la misma promesa durante todo el build para no gastar peticiones.
export function getGitHubRepos(): Promise<GitHubRepo[]> {
	reposPromise ??= loadRepos();
	return reposPromise;
}

// GitHub genera esta tarjeta PNG automáticamente a partir de los datos públicos del repo.
export function githubPreviewImage(repoName: string): string {
	return `https://opengraph.githubassets.com/1/${GITHUB_OWNER}/${repoName}`;
}
