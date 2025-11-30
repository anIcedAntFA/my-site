import { defineSlotRecipe } from '@pandacss/dev';

export const tooltipRecipe = defineSlotRecipe({
	className: 'tooltip',
	description: 'Styles for the Tooltip component',
	slots: ['trigger', 'content', 'arrow'],
	base: {
		trigger: {
			pos: 'relative',
			display: 'inline-block',
			cursor: 'pointer',
			// Show tooltip on hover (only when not hidden by Escape)
			_supportHover: {
				'&:not([data-tooltip-hidden]):hover [data-tooltip-text]': {
					visibility: 'visible',
					opacity: 1,
					transitionDuration: 'slower',
				},
			},
			// Show tooltip on focus-within (only when not hidden by Escape)
			'&:not([data-tooltip-hidden]):focus-within [data-tooltip-text]': {
				visibility: 'visible',
				opacity: 1,
				transitionDuration: 'slower',
			},
		},
		content: {
			'--tooltip-bg': 'colors.bg.inverted',
			'--tooltip-color': 'colors.fg.inverted',
			pos: 'absolute',
			whiteSpace: 'nowrap',
			bg: 'var(--tooltip-bg)',
			color: 'var(--tooltip-color)',
			rounded: 'sm',
			fontWeight: 'medium',
			boxShadow: 'md',
			visibility: 'hidden',
			opacity: 0,
			transitionProperty: 'opacity,visibility',
			transitionDuration: 'fast',
			zIndex: 'tooltip',
			cursor: 'auto',
			translate: 'auto',
		},
		arrow: {
			'--arrow-size': 'var(--tooltip-arrow-size)',
			'--arrow-bg': 'var(--tooltip-bg)',
			pos: 'absolute',
			width: 0,
			height: 0,
			translate: 'auto',
		},
	},
	variants: {
		placement: {
			top: {
				content: {
					bottom: '100%',
					left: '50%',
					x: '-50%',
					mb: 'var(--tooltip-offset)',
				},
				arrow: {
					top: '100%',
					left: '50%',
					x: '-50%',
					bl: 'var(--arrow-size) solid transparent',
					br: 'var(--arrow-size) solid transparent',
					bt: 'var(--arrow-size) solid var(--arrow-bg)',
				},
			},
			bottom: {
				content: {
					top: '100%',
					left: '50%',
					x: '-50%',
					mt: 'var(--tooltip-offset)',
				},
				arrow: {
					bottom: '100%',
					left: '50%',
					x: '-50%',
					bl: 'var(--arrow-size) solid transparent',
					br: 'var(--arrow-size) solid transparent',
					bb: 'var(--arrow-size) solid var(--arrow-bg)',
				},
			},
			left: {
				content: {
					right: '100%',
					top: '50%',
					y: '-50%',
					me: 'var(--tooltip-offset)',
				},
				arrow: {
					left: '100%',
					top: '50%',
					y: '-50%',
					bt: 'var(--arrow-size) solid transparent',
					bb: 'var(--arrow-size) solid transparent',
					bl: 'var(--arrow-size) solid var(--arrow-bg)',
				},
			},
			right: {
				content: {
					left: '100%',
					top: '50%',
					y: '-50%',
					ms: 'var(--tooltip-offset)',
				},
				arrow: {
					right: '100%',
					top: '50%',
					y: '-50%',
					bt: 'var(--arrow-size) solid transparent',
					bb: 'var(--arrow-size) solid transparent',
					br: 'var(--arrow-size) solid var(--arrow-bg)',
				},
			},
		},
		interactive: {
			true: {
				content: {
					pointerEvents: 'auto',
				},
			},
			false: {
				content: {
					pointerEvents: 'none',
				},
			},
		},
		size: {
			sm: {
				content: {
					'--tooltip-arrow-size': 'sizes.1',
					'--tooltip-offset': 'spacing.2',
					px: '2',
					py: '1',
					fontSize: 'xs',
				},
			},
			md: {
				content: {
					'--tooltip-arrow-size': 'sizes.1.5',
					'--tooltip-offset': 'spacing.2.5',
					px: '3',
					py: '1.5',
					fontSize: 'sm',
				},
			},
			lg: {
				content: {
					'--tooltip-arrow-size': 'sizes.2',
					'--tooltip-offset': 'spacing.3',
					px: '4',
					py: '2',
					fontSize: 'md',
				},
			},
		},
	},
	defaultVariants: {
		placement: 'top',
		size: 'md',
		interactive: false,
	},
});
