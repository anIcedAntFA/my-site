import { defineTokens } from '@pandacss/dev';

// Helper function to generate SVG URL token values
// from asset directory
const getSvgURL = (fileName: string) => ({
	type: 'url',
	value: `/src/asset/svg/${fileName}.svg`,
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
	quoteDoubleOpen: {
		value: getSvgURL('quote-double-open'),
	},
	quoteDoubleClose: {
		value: getSvgURL('quote-double-close'),
	},
	info: {
		value: getSvgURL('info'),
	},
	lightbulb: {
		value: getSvgURL('lightbulb'),
	},
	siren: {
		value: getSvgURL('siren'),
	},
	bomb: {
		value: getSvgURL('bomb'),
	},
	rocket: {
		value: getSvgURL('rocket'),
	},
	monitorCog: {
		value: getSvgURL('monitor-cog'),
	},
	sun: {
		value: getSvgURL('sun'),
	},
	moon: {
		value: getSvgURL('moon'),
	},
	check: {
		value: getSvgURL('check'),
	},
	chevronRight: {
		value: getSvgURL('chevron-right'),
	},
	slash: {
		value: getSvgURL('slash'),
	},
});
