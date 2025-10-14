import { em, round } from '@lib/style/calc.lib';
import { defineRecipe } from '@pandacss/dev';

export const prose = defineRecipe({
	className: 'prose',
	description: 'Typography styles for rich text content',
	base: {
		maxWidth: '68ch',
		color: 'fg',

		// Paragraphs
		'& p': {
			lineHeight: 'var(--line-height)',
			'--line-height': round(32 / 18),
			'&[data-drop-cap]': {
				_firstLetter: {
					float: 'left',
					rounded: 'sm',
					mr: '0.2em',
					mt: '0.1em',
					p: '0.1em 0.15em',
					color: 'fg.inverted',
					fontFamily: 'serif',
					fontSize: '2.5em',
					fontWeight: 'bold',
					lineHeight: 'calc(var(--line-height)/2)',
					bg: 'accent.inverted',
					shadow: '0.25rem 0.25rem {colors.accent}',
				},
			},
		},
	},
	variants: {
		size: {
			sm: {
				fontSize: 'sm',

				'& p': {
					my: em(16, 14),
					'--line-height': round(24 / 14),
				},
			},
			md: {
				fontSize: 'md',

				'& p': {
					my: em(20, 16),
					'--line-height': round(28 / 16),
				},
			},
			lg: {
				fontSize: 'lg',

				'& p': {
					my: em(24, 18),
				},
			},
			xl: {
				fontSize: 'xl',

				'& p': {
					my: em(28, 20),
					'--line-height': round(36 / 20),
				},
			},
			'2xl': {
				fontSize: '2xl',

				'& p': {
					'--line-height': round(40 / 24),
					my: em(32, 24),
				},
			},
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});
