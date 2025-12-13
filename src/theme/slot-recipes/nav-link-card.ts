import { defineSlotRecipe } from '@pandacss/dev';

export const navLinkCardRecipe = defineSlotRecipe({
	className: 'nav-link-card',
	description: 'Styles for navigation link card (post navigation)',
	slots: ['root', 'content', 'inner', 'title', 'description', 'icon'],
	base: {
		root: {
			pos: 'relative',
			rounded: {
				base: 'lg',
				'3xl': 'xl',
			},
			bg: 'accent',
			_focusVisible: {
				outlineOffset: '6px',
			},
			_previous: {
				justifySelf: 'start',
			},
			_next: {
				justifySelf: 'end',
			},
			_supportHover: {
				_hover: {
					'& > :first-child': {
						transform: 'translate(-3px, -5px)',
					},
				},
			},
			_active: {
				'& > :first-child': {
					transform: 'translateY(0)',
				},
			},
		},
		content: {
			pos: 'relative',
			display: 'flex',
			gap: {
				base: '3',
				'3xl': '4',
			},
			h: 'full',
			py: {
				base: '3',
				xs: '4',
				'3xl': '5',
			},
			px: {
				base: '4',
				xs: '5',
				'3xl': '6',
			},
			border: 'md',
			bdc: 'accent',
			rounded: {
				base: 'lg',
				'3xl': 'xl',
			},
			bg: 'bg.surface',
			transform: 'translate(-2px, -4px)',
			transitionDuration: 'normal',
			transitionProperty: 'transform',
			_previous: {
				textAlign: 'left',
			},
			_next: {
				textAlign: 'right',
			},
		},
		inner: {
			display: 'flex',
			flex: '1',
			flexDir: 'column',
			gap: '1',
		},
		title: {
			color: 'fg.muted',
			fontWeight: 'medium',
			textStyle: {
				base: 'xs',
				xs: 'sm',
				xl: 'md',
				'3xl': 'lg',
			},
		},
		description: {
			color: 'accent.fg',
			textStyle: {
				base: 'sm',
				xs: 'md',
				xl: 'lg',
				'3xl': 'xl',
			},
		},
		icon: {
			alignSelf: 'center',
			color: 'fg.muted',
			transitionProperty: 'color',
			transitionDuration: 'fast',
			_supportHover: {
				color: 'fg.subtle',
				_groupHover: {
					color: 'fg.muted',
					animation: 'nudge-right',
					animationDuration: 'slower',
				},
				'.group[data-direction="previous"] &': {
					maskImage: '{assets.arrowRight}',
					rotate: '180deg',
				},
				'.group[data-direction="next"] &': {
					maskImage: '{assets.arrowRight}',
				},
			},
		},
	},
});
