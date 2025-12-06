import { defineSlotRecipe } from '@pandacss/dev';

export const breadcrumbRecipe = defineSlotRecipe({
	className: 'breadcrumb',
	description: 'Styles for the Breadcrumb component',
	slots: [
		'root',
		'list',
		'item',
		'link',
		'currentLink',
		'separator',
		'ellipsis',
	],
	base: {
		root: {
			display: 'flex',
			alignItems: 'center',
		},
		list: {
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'wrap',
		},
		item: {
			display: 'inline-flex',
			alignItems: 'center',
		},
		link: {
			display: 'inline-flex',
			alignItems: 'center',
			color: 'fg.muted',
			fontWeight: 'medium',
			textDecoration: 'none',
			whiteSpace: 'nowrap',
			transitionProperty: 'color',
			transitionDuration: 'fast',
			transitionTimingFunction: 'ease-in-out',
			_supportNestedHover: {
				color: 'fg.strong',
			},
		},
		currentLink: {
			display: 'inline-flex',
			alignItems: 'center',
			gap: '1',
			color: 'fg.strong',
			fontWeight: 'medium',
			whiteSpace: 'nowrap',
		},
		separator: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'fg.subtle',
			flexShrink: '0',
			userSelect: 'none',
			'& span': {
				w: '1.2em',
				h: '1.2em',
			},
		},
		ellipsis: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'fg.muted',
			fontWeight: 'bold',
			cursor: 'default',
			userSelect: 'none',
		},
	},
	variants: {
		variant: {
			plain: {
				link: {
					textDecoration: 'none',
				},
			},
			underline: {
				link: {
					pos: 'relative',
					_before: {
						content: '""',
						pos: 'absolute',
						display: 'inline-block',
						w: 'full',
						bottom: '0',
						left: '0',
						height: '0.1em',
						rounded: 'sm',
						bg: 'fg.muted',
						transitionProperty: 'opacity',
						transitionDuration: 'fast',
					},
					_hover: {
						_before: {
							opacity: '0',
						},
					},
				},
			},
		},
		size: {
			sm: {
				list: {
					gap: '0.5',
				},
				item: {
					gap: '0.25',
				},
				link: {
					textStyle: 'xs',
				},
				currentLink: {
					textStyle: 'xs',
				},
				separator: {
					textStyle: 'xs',
				},
				ellipsis: {
					textStyle: 'xs',
					px: '1',
				},
			},
			md: {
				list: {
					gap: '1',
				},
				item: {
					gap: '0.5',
				},
				link: {
					textStyle: 'sm',
				},
				currentLink: {
					textStyle: 'sm',
				},
				separator: {
					textStyle: 'sm',
				},
				ellipsis: {
					textStyle: 'sm',
					px: '1.25',
				},
			},
			lg: {
				list: {
					gap: '1.5',
				},
				item: {
					gap: '1',
				},
				link: {
					textStyle: 'md',
				},
				currentLink: {
					textStyle: 'md',
				},
				separator: {
					textStyle: 'md',
				},
				ellipsis: {
					textStyle: 'md',
					px: '1.5',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'plain',
		size: 'md',
	},
});
