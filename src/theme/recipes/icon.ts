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
				w: '1em',
				h: '1em',
			},
			sm: {
				w: '1.2em',
				h: '1.2em',
			},
			md: {
				w: '1.4em',
				h: '1.4em',
			},
			lg: {
				w: '1.7em',
				h: '1.7em',
			},
			xl: {
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
