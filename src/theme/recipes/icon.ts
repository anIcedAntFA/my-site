import { defineRecipe } from '@pandacss/dev';

export const iconRecipe = defineRecipe({
	className: 'icon',
	description: 'Icon styles with mask or background image support',
	base: {
		display: 'inline-block',
		flexShrink: 0,
	},
	variants: {
		mode: {
			mask: {
				bg: 'currentColor',
				maskPosition: 'center',
				maskRepeat: 'no-repeat',
				maskSize: 'contain',
			},
			background: {
				bgPosition: 'center',
				bgRepeat: 'no-repeat',
				bgSize: 'contain',
			},
		},
		size: {
			xs: {
				w: '0.75em',
				h: '0.75em',
			},
			sm: {
				w: '0.875em',
				h: '0.875em',
			},
			md: {
				w: '1em',
				h: '1em',
			},
			lg: {
				w: '1.2em',
				h: '1.2em',
			},
			xl: {
				w: '1.5em',
				h: '1.5em',
			},
			'2xl': {
				w: '2em',
				h: '2em',
			},
		},
	},
	defaultVariants: {
		mode: 'mask',
		size: 'md',
	},
});
