import { defineSlotRecipe } from '@pandacss/dev';

export const buttonRecipe = defineSlotRecipe({
	className: 'button',
	description: 'Styles for the Button component',
	slots: ['root', 'content'],
	base: {
		root: {
			cursor: 'pointer',
			border: 'none',
			fontWeight: 'medium',
			textTransform: 'uppercase',
			userSelect: 'none',
			_disabled: {
				opacity: 0.4,
				pointerEvents: 'none',
			},
		},
		content: {
			display: 'inline-flex',
			alignItems: 'center',
			border: 'md',
			transitionTimingFunction: 'ease-in-out',
			transitionDuration: 'fast',
			transitionProperty: 'transform',
		},
	},
	variants: {
		variant: {
			contained: {
				root: {
					pos: 'relative',
					bg: 'base.solid',
					_supportHover: {
						'&:hover > :first-child::before': {
							opacity: 1,
							animation: 'shiny-glass 1.4s ease-in-out',
						},
					},
				},
				content: {
					bdc: 'base.solid',
					color: 'accent.contrast',
					bg: 'accent.gradient',
					overflow: 'hidden',
					_before: {
						zIndex: 'base',
						inset: 0,
						pos: 'absolute',
						left: '-100%',
						transform: 'skew(45deg)',
						w: '80%',
						h: '100%',
						bg: 'linear-gradient(90deg,transparent,rgb(255 255 255 / 40%),transparent)',
						opacity: 0,
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: 'normal',
						transitionProperty: 'opacity',
						content: '""',
						pointerEvents: 'none',
					},
				},
			},
			outlined: {
				root: {
					bg: 'accent',
				},
				content: {
					bdc: 'accent',
					color: 'slate.900',
					bg: 'slate.50',
				},
			},
		},
		size: {
			sm: {
				root: {
					rounded: 'md',
					_focusVisible: {
						outlineOffset: '4px',
					},
				},
				content: {
					textStyle: 'sm',
					rounded: 'md',
					h: '9',
					px: '4',
					letterSpacing: 'wide',
				},
			},
			md: {
				root: {
					rounded: 'lg',
					_focusVisible: {
						outlineOffset: '5px',
					},
				},
				content: {
					textStyle: 'md',
					rounded: 'lg',
					h: '11',
					px: '5',
					letterSpacing: 'wider',
				},
			},
			lg: {
				root: {
					rounded: 'lg',
					_focusVisible: {
						outlineOffset: '6px',
					},
				},
				content: {
					textStyle: 'lg',
					rounded: 'lg',
					h: '14',
					px: '6',
					letterSpacing: 'wider',
				},
			},
		},
	},
	defaultVariants: {
		size: 'md',
		variant: 'contained',
	},
	compoundVariants: [
		{
			variant: 'contained',
			size: 'sm',
			css: {
				root: {
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-1px,-3px)',
				},
			},
		},
		{
			variant: 'contained',
			size: 'md',
			css: {
				root: {
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-2px,-4px)',
				},
			},
		},
		{
			variant: 'contained',
			size: 'lg',
			css: {
				root: {
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-3px,-5px)',
				},
			},
		},
		{
			variant: 'outlined',
			size: 'sm',
			css: {
				root: {
					_hover: {
						'& > :first-child': {
							transform: 'translate(-2px,-4px)',
						},
					},
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-1px,-3px)',
				},
			},
		},
		{
			variant: 'outlined',
			size: 'md',
			css: {
				root: {
					_hover: {
						'& > :first-child': {
							transform: 'translate(-3px,-5px)',
						},
					},
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-2px,-4px)',
				},
			},
		},
		{
			variant: 'outlined',
			size: 'lg',
			css: {
				root: {
					_hover: {
						'& > :first-child': {
							transform: 'translate(-4px,-6px)',
						},
					},
					_active: {
						'& > :first-child': {
							transform: 'translateY(0)',
						},
					},
				},
				content: {
					transform: 'translate(-3px,-5px)',
				},
			},
		},
	],
});
