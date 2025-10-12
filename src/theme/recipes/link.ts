import { defineRecipe } from '@pandacss/dev';

export const linkRecipe = defineRecipe({
	className: 'text-link',
	description:
		'Text link styles with semantic variants for different use cases',
	base: {
		display: 'inline-flex',
		pos: 'relative',
		alignItems: 'center',
		color: 'var(--clr-link, {colors.link})',
		textDecoration: 'none',
		_blank: {
			_after: {
				display: 'inline-block',
				w: 'var(--size-icon)',
				h: 'var(--size-icon)',
				ml: '1',
				bg: 'currentColor',
				transitionDuration: 'fast',
				transitionProperty: 'opacity',
				content: '""',
				maskImage: '{assets.externalLink}',
				maskSize: 'cover',
			},
		},
		_visited: {
			color: 'var(--clr-link-visited, {colors.link.visited})',
		},
	},
	variants: {
		// semantic visual variant
		visual: {
			// subtle = light emphasis, originally "opacity"
			subtle: {
				transitionTimingFunction: 'ease',
				transitionDuration: 'fast',
				transitionProperty: 'opacity',
				_before: {
					position: 'absolute',
					left: '0',
					bottom: '0',
					rounded: 'sm',
					w: '{sizes.full}',
					h: '0.5',
					bg: 'currentcolor/80',
					opacity: 1,
					transitionDuration: 'inherit',
					content: '""',
				},
				_supportHover: {
					'&:hover': {
						opacity: 0.8,
						_before: {
							opacity: 0,
						},
					},
				},
			},

			// underline = animated underline (same as original underline behaviour)
			underline: {
				_before: {
					position: 'absolute',
					left: '0',
					bottom: '0',
					transformOrigin: '100% 50%',
					scale: 'auto',
					scaleX: '0',
					rounded: 'sm',
					w: '{sizes.full}',
					h: '0.5',
					bg: 'currentcolor/80',
					transitionDuration: 'slow',
					transitionProperty: 'scale',
					content: '""',
				},
				_supportHover: {
					'&:hover': {
						_before: {
							transformOrigin: '0% 50%',
							scaleX: '1',
						},
					},
				},
			},

			// highlight = soft background highlight behind text (was background)
			highlight: {
				px: '1',
				_before: {
					position: 'absolute',
					left: '0',
					bottom: '0',
					rounded: 'sm',
					boxSize: '{sizes.full}',
					bg: 'currentColor/10',
					opacity: 0,
					// transitionTimingFunction: 'ease-in-out',
					transitionDuration: 'normal',
					transitionProperty: 'opacity',
					content: '""',
				},
				_supportHover: {
					'&:hover': {
						_before: {
							opacity: 1,
						},
					},
				},
			},
		},

		// size semantic names remain
		size: {
			sm: {
				textStyle: 'sm',
				'--size-icon': '0.75em',
			},
			md: {
				textStyle: 'md',
				'--size-icon': '0.875em',
			},
			lg: {
				textStyle: 'lg',
				'--size-icon': '1em',
			},
		},

		// state variant for interactive state
		state: {
			enabled: {},
			disabled: {
				opacity: 0.4,
				userSelect: 'none',
				pointerEvents: 'none',
			},
		},
	},
	defaultVariants: {
		visual: 'subtle',
		size: 'md',
	},
});
