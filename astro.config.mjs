// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import qwikdev from '@qwikdev/astro';
import { defineConfig } from 'astro/config';
import { rehypeSectionsForHeadings } from './plugin/rehype';
import { remarkDropCapParagraph, remarkExternalLinks } from './plugin/remark';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			configPath: './wrangler.jsonc',
			enabled: true,
		},
		imageService: 'compile',
	}),
	integrations: [qwikdev(), mdx()],
	output: 'static',
	markdown: {
		remarkPlugins: [remarkExternalLinks, remarkDropCapParagraph],
		rehypePlugins: [
			[rehypeHeadingIds, { headingIdCompat: true }],
			rehypeSectionsForHeadings,
		],
	},
});
