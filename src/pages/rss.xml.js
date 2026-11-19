import rss from '@astrojs/rss';
import { BASE_URL, SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSortedPosts } from '../utils/posts';

export async function GET(context) {
	const posts = await getSortedPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: new URL(BASE_URL, context.site),
		customData: '<language>es</language>',
		items: posts.map((post) => ({
			...post.data,
			link: `${BASE_URL}blog/${post.id}/`,
		})),
	});
}
