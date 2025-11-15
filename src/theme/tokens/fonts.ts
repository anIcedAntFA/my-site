import { defineTokens } from '@pandacss/dev';

export const fonts = defineTokens.fonts({
	body: {
		value: 'var(--font-noto)',
	},
	mono: {
		value: 'var(--font-mono)',
	},
	heading: {
		value: 'var(--font-serif)',
	},
});
