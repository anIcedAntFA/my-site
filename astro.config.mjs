// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import { defineConfig, fontProviders } from 'astro/config';
import qwikdev from '@qwikdev/astro';

import { rehypeCheckbox, rehypeSectionsForHeadings } from './plugin/rehype';
import {
	remarkBlockQuotationCiteURL,
	remarkDropCapParagraph,
	remarkExternalLinks,
	remarkInlinedQuotation,
	remarkModifiedTime,
	remarkReadingTime,
	remarkTextHighlight,
} from './plugin/remark';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			configPath: './wrangler.jsonc',
			enabled: true,
		},
		imageService: 'compile',
	}),
	integrations: [
		qwikdev(),
		mdx({
			remarkPlugins: [
				remarkReadingTime,
				remarkModifiedTime,
				remarkExternalLinks,
				remarkDropCapParagraph,
				remarkTextHighlight,
				remarkInlinedQuotation,
				remarkBlockQuotationCiteURL,
			],
			rehypePlugins: [
				[rehypeHeadingIds, { headingIdCompat: true }],
				rehypeSectionsForHeadings,
				rehypeCheckbox,
			],
		}),
	],
	output: 'static',
	site: 'https://blog.ngockhoi96.dev',
	prefetch: {
		defaultStrategy: 'hover',
	},
	experimental: {
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: 'Noto Sans',
				cssVariable: '--font-noto-sans',
				display: 'swap',
				weights: ['400', '500', '700'],
				styles: ['normal', 'italic'],
				subsets: ['latin', 'vietnamese'],
				fallbacks: ['sans-serif'],
			},
			{
				provider: fontProviders.fontsource(),
				name: 'Merriweather',
				cssVariable: '--font-merriweather-serif',
				display: 'swap',
				weights: ['700'],
				styles: ['normal'],
				subsets: ['latin', 'vietnamese'],
				fallbacks: ['serif'],
			},
			{
				provider: fontProviders.fontsource(),
				name: 'JetBrains Mono',
				cssVariable: '--font-jetbrains-mono',
				display: 'swap',
				weights: ['500', '700'],
				styles: ['normal'],
				subsets: ['latin'],
				fallbacks: ['monospace'],
			},
		],
	},
});
