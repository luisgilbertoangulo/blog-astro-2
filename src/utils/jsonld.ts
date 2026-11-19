// Datos estructurados (schema.org) del sitio.
// Cada función construye un nodo y BaseHead los combina en un único grafo @graph.

import { AUTHOR, AUTHOR_URL, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export interface JsonLdNode {
	'@type': string;
	'@id'?: string;
	[key: string]: unknown;
}

export interface BreadcrumbItem {
	name: string;
	// Puede ser una ruta relativa a la raíz (por ejemplo, `${BASE_URL}blog/`).
	url?: string;
}

const siteId = (site: URL) => new URL('#website', site).href;
const personId = (site: URL) => new URL('#person', site).href;

export function personNode(site: URL): JsonLdNode {
	return {
		'@type': 'Person',
		'@id': personId(site),
		name: AUTHOR,
		url: new URL('about/', site).href,
		sameAs: [AUTHOR_URL],
	};
}

export function websiteNode(site: URL): JsonLdNode {
	return {
		'@type': 'WebSite',
		'@id': siteId(site),
		name: SITE_TITLE,
		url: site.href,
		description: SITE_DESCRIPTION,
		publisher: { '@id': personId(site) },
		inLanguage: 'es',
	};
}

interface WebPageParams {
	site: URL;
	canonicalURL: URL;
	title: string;
	description: string;
	imageURL: URL;
}

export function webPageNode({
	site,
	canonicalURL,
	title,
	description,
	imageURL,
}: WebPageParams): JsonLdNode {
	return {
		'@type': 'WebPage',
		'@id': canonicalURL.href,
		url: canonicalURL.href,
		name: title,
		description,
		isPartOf: { '@id': siteId(site) },
		primaryImageOfPage: imageURL.href,
		inLanguage: 'es',
	};
}

interface BlogPostingParams {
	site: URL;
	canonicalURL: URL;
	imageURL: URL;
	title: string;
	description: string;
	publishedTime?: Date;
	modifiedTime?: Date;
	tags?: string[];
	minutes?: number;
}

export function blogPostingNode({
	site,
	canonicalURL,
	imageURL,
	title,
	description,
	publishedTime,
	modifiedTime,
	tags = [],
	minutes,
}: BlogPostingParams): JsonLdNode {
	return {
		'@type': 'BlogPosting',
		'@id': `${canonicalURL.href}#article`,
		headline: title,
		description,
		image: imageURL.href,
		datePublished: publishedTime?.toISOString(),
		dateModified: (modifiedTime ?? publishedTime)?.toISOString(),
		author: { '@id': personId(site) },
		publisher: { '@id': personId(site) },
		mainEntityOfPage: { '@id': canonicalURL.href },
		inLanguage: 'es',
		...(tags.length > 0 ? { keywords: tags.join(', ') } : {}),
		...(minutes ? { timeRequired: `PT${minutes}M` } : {}),
	};
}

export function profilePageNode(site: URL, canonicalURL: URL, title: string): JsonLdNode {
	return {
		'@type': 'ProfilePage',
		'@id': canonicalURL.href,
		url: canonicalURL.href,
		name: title,
		isPartOf: { '@id': siteId(site) },
		mainEntity: { '@id': personId(site) },
		inLanguage: 'es',
	};
}

export function breadcrumbNode(canonicalURL: URL, items: BreadcrumbItem[]): JsonLdNode {
	return {
		'@type': 'BreadcrumbList',
		'@id': `${canonicalURL.href}#breadcrumb`,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			...(item.url ? { item: new URL(item.url, canonicalURL).href } : {}),
		})),
	};
}

export function serializeJsonLd(graph: JsonLdNode[]): string {
	return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
		/</g,
		'\\u003c',
	);
}
