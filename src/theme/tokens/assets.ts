import { defineTokens } from '@pandacss/dev';

// Helper function to generate SVG URL token values
// from public directory
const getSvgURL = (fileName: string) => ({
	type: 'url',
	value: `/svg/${fileName}.svg`,
});

export const assets = defineTokens.assets({
	arrowUp: {
		value: getSvgURL('arrow-up'),
	},
	externalLink: {
		value: getSvgURL('external-link'),
	},
	hash: {
		value: getSvgURL('hash'),
	},
	link: {
		value: getSvgURL('link'),
	},
});
