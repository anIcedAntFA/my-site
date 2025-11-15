import rss, { pagesGlobToRssItems, type RSSOptions } from '@astrojs/rss';

export async function GET(context: RSSOptions) {
	return rss({
		// `<title>` field in output xml
		title: "ngockhoi96's blog",
		// `<description>` field in output xml
		description: 'Personal blog about programming, technology, and life.',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
		// (optional) inject custom xml
		customData: '<language>en-us</language>',
	});
}
