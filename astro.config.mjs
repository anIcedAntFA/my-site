// @ts-check
import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import qwikdev from "@qwikdev/astro";
import { defineConfig } from "astro/config";

import { rehypeCheckbox, rehypeSectionsForHeadings } from "./plugin/rehype";
import {
	remarkBlockQuotationCiteURL,
	remarkDropCapParagraph,
	remarkExternalLinks,
	remarkInlinedQuotation,
	remarkTextHighlight,
} from "./plugin/remark";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			configPath: "./wrangler.jsonc",
			enabled: true,
		},
		imageService: "compile",
	}),
	integrations: [
		qwikdev(),
		mdx({
			remarkPlugins: [
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
	output: "static",
});
