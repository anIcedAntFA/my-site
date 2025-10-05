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
					bg: { base: 'colorPalette.900', _dark: 'colorPalette.700' },
					_supportHover: {
						'&:hover > :first-child::before': {
							opacity: 1,
							animation: 'shiny-glass 1.4s ease-in-out',
						},
					},
				},
				content: {
					bdc: { base: 'colorPalette.900', _dark: 'colorPalette.700' },
					color: { base: 'white', _dark: 'slate.900' },
					bg: {
						base: 'linear-gradient(135deg, {colors.colorPalette.400} 10%, {colors.colorPalette.500} 30%, {colors.colorPalette.600} 60%)',
						_dark:
							'linear-gradient(135deg, {colors.colorPalette.300} 10%, {colors.colorPalette.400} 30%, {colors.colorPalette.500} 60%)',
					},
					overflow: 'hidden',
					_before: {
						zIndex: 0,
						inset: 0,
						pos: 'absolute',
						left: '-100%',
						transform: 'skew(45deg)',
						w: '80%',
						h: '100%',
						bg: 'linear-gradient(90deg,transparent,rgb(255 255 255 / 40%),transparent)',
						opacity: 0,
						transition: 'opacity 0.15s ease-in-out',
						content: '""',
						pointerEvents: 'none',
					},
				},
			},
			outlined: {
				root: {
					bg: 'colorPalette',
				},
				content: {
					bdc: 'colorPalette',
					color: 'base.900',
					bg: 'base.50',
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
					h: 9,
					px: 4,
					letterSpacing: 'normal',
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
					h: 11,
					px: 5,
					letterSpacing: 'wide',
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
					h: 14,
					px: 6,
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
