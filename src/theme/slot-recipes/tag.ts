import { defineSlotRecipe } from '@pandacss/dev';

/**
 * Tag Slot Recipe
 *
 * A multi-part tag component with separate styling for root, icon, label, and count badge.
 *
 * @slots
 * - root: The main wrapper (anchor/link element)
 * - startElement: Hash icon element
 * - label: Text label element
 * - endElement: Count badge element (circle with number)
 *
 * @example
 * ```tsx
 * import { tag } from '@/styled-system/recipes';
 *
 * const classes = tag({ variant: 'javascript', size: 'sm' });
 *
 * <a className={classes.root}>
 *   <span className={classes.startElement} />
 *   <span className={classes.label}>JavaScript</span>
 *   <span className={classes.endElement}>5</span>
 * </a>
 * ```
 */
export const tagSlotRecipe = defineSlotRecipe({
	className: 'tag',
	description: 'Multi-part tag component with icon, label, and count badge',
	slots: ['root', 'startElement', 'label', 'endElement'],
	base: {
		root: {
			display: 'inline-flex',
			alignItems: 'center',
			fontWeight: 'medium',
			textDecoration: 'none',
			border: 'md',
			bdc: {
				base: '{colors.black}',
				_dark: '{colors.whiteAlpha.900}',
			},
			maxW: 'full',
			bg: 'var(--tag-bg-clr)',
			color: 'var(--tag-clr)',
			overflow: 'hidden',
			shadowColor: {
				base: '{colors.black}',
				_dark: '{colors.whiteAlpha.900}',
			},
			translate: 'auto',
			transitionProperty: 'translate',
			transitionDuration: 'normal',
			_before: {
				inset: 0,
				pos: 'absolute',
				left: '-100%',
				transform: 'skew(45deg)',
				w: '80%',
				h: '100%',
				bg: 'linear-gradient(90deg,transparent,{colors.whiteAlpha.700},transparent)',
				opacity: 0,
				transitionProperty: 'opacity',
				transitionDuration: 'normal',
				content: '""',
				pointerEvents: 'none',
			},
			_supportHover: {
				_hover: {
					_before: {
						opacity: 1,
						animation: 'shiny-glass',
					},
				},
			},
		},
		startElement: {
			display: 'inline-block',
			flexShrink: 0,
			w: '1em',
			h: '1em',
			bg: 'currentColor',
			maskPosition: 'center',
			maskRepeat: 'no-repeat',
			maskSize: 'cover',
			maskImage: '{assets.hash}',
		},
		label: {
			display: 'inline-block',
			lineClamp: '1',
		},
		endElement: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			rounded: 'full',
			bg: 'white',
			color: 'black',
			fontWeight: 'medium',
			flexShrink: 0,
		},
	},
	variants: {
		/**
		 * Size variants - controls dimensions, font size and hover offset
		 */
		size: {
			sm: {
				root: {
					rounded: 'sm',
					h: '8',
					px: '2',
					boxShadow: '1px 2px 0px 0px var(--shadow-color)',
					textStyle: 'sm',
					_supportHover: {
						_hover: {
							y: '-3px',
						},
					},
				},
				startElement: {
					mr: '0.25',
				},
				endElement: {
					ml: '1',
					boxSize: '5',
					textStyle: 'xs',
				},
			},
			md: {
				root: {
					rounded: 'md',
					h: '10',
					px: '2.5',
					boxShadow: '1.5px 3px 0px 0px var(--shadow-color)',
					textStyle: 'md',
					_supportHover: {
						_hover: {
							y: '-4px',
						},
					},
				},
				startElement: {
					mr: '0.375',
				},
				endElement: {
					ml: '1.5',
					boxSize: '6',
					textStyle: 'sm',
				},
			},
			lg: {
				root: {
					rounded: 'lg',
					h: '12',
					px: '3',
					boxShadow: '2px 4px 0px 0px var(--shadow-color)',
					textStyle: 'lg',
					_supportHover: {
						_hover: {
							y: '-5px',
						},
					},
				},
				startElement: {
					mr: '0.5',
				},
				endElement: {
					ml: '2',
					boxSize: '7',
					textStyle: 'md',
				},
			},
		},
		/**
		 * Technology/topic color variants
		 */
		variant: {
			javascript: {
				root: {
					'--tag-bg-clr': 'colors.javascript',
					'--tag-clr': 'colors.black',
				},
			},
			typescript: {
				root: {
					'--tag-bg-clr': 'colors.typescript',
					'--tag-clr': 'colors.white',
				},
			},
			css: {
				root: {
					'--tag-bg-clr': 'colors.css',
					'--tag-clr': 'colors.white',
				},
			},
			reactjs: {
				root: {
					'--tag-bg-clr': 'colors.reactjs',
					'--tag-clr': 'colors.black',
				},
			},
			astro: {
				root: {
					'--tag-bg-clr': 'colors.astro',
					'--tag-clr': 'colors.white',
				},
			},
			vuejs: {
				root: {
					'--tag-bg-clr': 'colors.vuejs',
					'--tag-clr': 'colors.black',
				},
			},
			cloudflare: {
				root: {
					'--tag-bg-clr': 'colors.cloudflare',
					'--tag-clr': 'colors.black',
				},
			},
			testing: {
				root: {
					'--tag-bg-clr': 'colors.testing',
					'--tag-clr': 'colors.black',
				},
			},
			git: {
				root: {
					'--tag-bg-clr': 'colors.git',
					'--tag-clr': 'colors.white',
				},
			},
			linux: {
				root: {
					'--tag-bg-clr': 'colors.linux',
					'--tag-clr': 'colors.black',
				},
			},
			coding: {
				root: {
					'--tag-bg-clr': 'colors.coding',
					'--tag-clr': 'colors.black',
				},
			},
			qwik: {
				root: {
					'--tag-bg-clr': 'colors.qwik',
					'--tag-clr': 'colors.black',
				},
			},
			pandacss: {
				root: {
					'--tag-bg-clr': 'colors.pandacss',
					'--tag-clr': 'colors.black',
				},
			},
			markdown: {
				root: {
					'--tag-bg-clr': 'colors.markdown',
					'--tag-clr': 'colors.white',
				},
			},
			golang: {
				root: {
					'--tag-bg-clr': 'colors.golang',
					'--tag-clr': 'colors.white',
				},
			},
			postgres: {
				root: {
					'--tag-bg-clr': 'colors.postgres',
					'--tag-clr': 'colors.white',
				},
			},
			docker: {
				root: {
					'--tag-bg-clr': 'colors.docker',
					'--tag-clr': 'colors.white',
				},
			},
		},
	},
	defaultVariants: {
		size: 'sm',
		variant: 'javascript',
	},
});
