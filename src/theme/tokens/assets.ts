import { defineTokens } from '@pandacss/dev';

export const assets = defineTokens.assets({
	arrowUp: {
		value: {
			type: 'url',
			value: '/arrow-up.svg',
		},
	},
	externalLink: {
		value: {
			type: 'url',
			value: '/external-link.svg',
		},
	},
});
