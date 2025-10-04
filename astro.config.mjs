// @ts-check
import cloudflare from '@astrojs/cloudflare';
import qwikdev from '@qwikdev/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
		imageService: 'compile',
	}),

	integrations: [qwikdev()],
});
