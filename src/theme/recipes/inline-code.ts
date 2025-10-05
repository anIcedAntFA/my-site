import { defineRecipe } from '@pandacss/dev';

export const inlineCodeRecipe = defineRecipe({
	className: 'inline-code',
	description: 'Styles for inline code elements',
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		color: 'colorPalette.fg',
		shadowColor: 'colorPalette.muted',
		fontFamily: 'mono',
		fontWeight: 'medium',
		wordBreak: 'break-all',
		bg: 'colorPalette.muted/60',
		shadow: 'inset 0 0 0px 1px var(--shadow-color)',
		whiteSpace: 'pre',
	},
	variants: {
		size: {
			sm: {
				textStyle: 'xs',
				rounded: 'xs',
				minH: '5',
				px: '1',
			},
			md: {
				textStyle: 'sm',
				rounded: 'sm',
				minH: '6',
				px: '1.5',
			},
			lg: {
				textStyle: 'md',
				rounded: 'sm',
				minH: '8',
				px: '2',
			},
		},
	},
	defaultVariants: {
		size: 'md',
	},
});
