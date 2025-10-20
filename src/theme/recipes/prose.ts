import { em } from '@lib/style/calc.lib';
import { defineRecipe } from '@pandacss/dev';

export const prose = defineRecipe({
	className: 'prose',
	description: 'Typography styles for rich text content',
	base: {
		maxWidth: '68ch',
		color: 'fg',

		// Headings
		'& h1, & h2, & h3, & h4': {
			display: 'inline',
			color: 'fg.headline',
			textWrap: 'balance',
			scrollMarginTop: '4rem',
		},
		'& h1': {
			fontWeight: 'extrabold',
			lineHeight: 'tight',
		},
		'& h2, & h3, & h4': {
			lineHeight: 'relaxed',
		},
		'& h1 strong': {
			fontWeight: 'black',
		},
		'& [data-level="2"] button': {
			fontSize: '1.125em',
		},
		'& h2': {
			fontWeight: 'bold',
		},
		'& h2 strong': {
			fontWeight: 'extrabold',
		},
		'& h3': {
			fontWeight: 'semibold',
		},
		'& [data-level="3"] button': {
			fontSize: '1em',
		},
		'& h3 strong': {
			fontWeight: 'bold',
		},
		'& h4': {
			fontWeight: 'semibold',
		},
		'& [data-level="4"] button': {
			fontSize: '0.875em',
		},
		'& h4 strong': {
			fontWeight: 'bold',
		},

		// Paragraphs
		'& p': {
			lineHeight: 'content',
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
					lineHeight: 'calc({lineHeights.content}/2)',
					bg: 'accent.inverted',
					shadow: '0.25rem 0.25rem {colors.accent}',
				},
			},
		},

		// Links
		'& a[data-text-link]': {
			display: 'inline',
			color: 'accent',
			textDecoration: 'underline',
			fontWeight: 'medium',
			textUnderlineOffset: '0.125em',
			transitionDuration: 'fast',
			transitionProperty: 'opacity',
			_blank: {
				_after: {
					display: 'inline-block',
					w: '0.875em',
					h: '0.875em',
					ml: '0.25em',
					bg: 'currentColor',
					transitionDuration: 'fast',
					transitionProperty: 'opacity',
					content: '""',
					maskImage: '{assets.externalLink}',
					maskSize: 'cover',
				},
			},
			_hover: {
				textDecoration: 'none',
				opacity: 0.8,
			},
		},

		// Strong and emphasis
		'& strong': {
			color: 'fg.headline',
			fontWeight: 'semibold',
		},
		'& em': {
			fontStyle: 'italic',
		},

		// Lists
		'& ul': {
			marginTop: '1.25em',
			marginBottom: '1.25em',
			paddingLeft: '1.625em',
			listStyleType: 'disc',
		},
		'& ol': {
			marginTop: '1.25em',
			marginBottom: '1.25em',
			paddingLeft: '1.625em',
			listStyleType: 'decimal',
		},
		'& li': {
			marginTop: '0.5em',
			marginBottom: '0.5em',
		},
		'& li p': {
			marginTop: '0.75em',
			marginBottom: '0.75em',
		},
		'& li > *:first-child': {
			marginTop: '1.25em',
		},
		'& li > *:last-child': {
			marginBottom: '1.25em',
		},

		// Nested lists
		'& ul > li': {
			paddingLeft: '0.375em',
		},
		'& ol > li': {
			paddingLeft: '0.375em',
		},
		'& ul ul, & ul ol, & ol ul, & ol ol': {
			marginTop: '0.75em',
			marginBottom: '0.75em',
		},

		// Blockquote
		// Inlined quote
		'& q': {
			fontStyle: 'italic',
			_before: {
				y: '-0.25em',
				maskImage: '{assets.quoteDoubleOpen}',
			},
			_after: {
				y: '-0.125em',
				maskImage: '{assets.quoteDoubleClose}',
			},
			'&::before, &::after': {
				display: 'inline-block',
				translate: 'auto',
				w: '0.75em',
				h: '0.75em',
				bg: 'accent',
				content: '""',
				maskSize: 'cover',
			},
		},
		// Block quotation
		'& blockquote, & figure': {
			pos: 'relative',
			borderTopRightRadius: 'var(--border-radius)',
			borderBottomRightRadius: 'var(--border-radius)',
			mt: '1.6em',
			mb: '1.6em',
			py: '1.25em',
			pe: 'calc(var(--spacing-right) + var(--border-width))',
			ps: 'calc(var(--spacing-right) * 2 + var(--border-width) + var(--icon-size))',
			bg: 'bg.emphasized/60',
			fontStyle: 'italic',
			_before: {
				pos: 'absolute',
				top: 'var(--spacing-right)',
				left: 'calc(var(--spacing-right) + var(--border-width))',
				w: 'var(--icon-size)',
				h: 'var(--icon-size)',
				bg: 'accent.gradient',
				content: '""',
				maskImage: '{assets.quoteDoubleOpen}',
				maskSize: 'cover',
			},
			_after: {
				zIndex: '1',
				pos: 'absolute',
				top: '0',
				left: '0',
				bottom: '0',
				w: 'var(--border-width)',
				bg: 'accent.gradient',
				content: '""',
			},
			'--border-width': '0.5em',
			'--border-radius': '0.75em',
			'--spacing-right': '1em',
			'--icon-size': '2em',
		},
		'& figure': {
			'& blockquote': {
				all: 'unset',
				_before: { all: 'unset' },
				_after: { all: 'unset' },
			},
			'& figcaption': {
				mt: '0.5em',
				color: 'fg.muted',
				textAlign: 'right',
				'& cite': {
					fontStyle: 'italic',
				},
			},
		},

		// Inlined Code
		'& code': {
			display: 'inline',
			rounded: '0.25em',
			p: '0.125em 0.25em',
			color: 'base.fg',
			shadowColor: 'base.muted',
			fontFamily: 'mono',
			fontSize: '0.875em',
			fontWeight: 'medium',
			bg: 'base.muted/60',
			shadow: 'inset 0 0 0px 1px var(--shadow-color)',
		},

		// Pre and code blocks
		'& pre code': {
			rounded: '0',
			borderWidth: '0',
			padding: '0',
			color: 'inherit',
			fontFamily: 'inherit',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			lineHeight: 'inherit',
			backgroundColor: 'transparent',
			boxShadow: 'none',
		},
	},
	variants: {
		size: {
			sm: {
				// Headings
				fontSize: 'sm',

				'& > h1': {
					mt: '0',
					mb: em(24, 30),
					fontSize: em(30, 14),
				},
				'& [data-level="2"]': {
					mt: em(32, 20),
					mb: em(16, 20),
					'& > h2': {
						fontSize: em(20, 14),
					},
				},
				'& [data-level="3"]': {
					mt: em(28, 18),
					mb: em(8, 18),
					'& > h3': {
						fontSize: em(18, 14),
					},
				},
				'& [data-level="4"]': {
					mt: em(20, 14),
					mb: em(8, 14),
				},

				// Paragraphs
				'& p': {
					my: em(16, 14),
				},
			},
			md: {
				fontSize: 'md',

				// Headings
				'& > h1': {
					mt: '0',
					mb: em(32, 36),
					fontSize: em(36, 16),
				},
				'& [data-level="2"]': {
					mt: em(48, 24),
					mb: em(24, 24),
					'& > h2': {
						fontSize: em(24, 16),
					},
				},
				'& [data-level="3"]': {
					mt: em(32, 20),
					mb: em(12, 20),
					'& > h3': {
						fontSize: em(20, 16),
					},
				},
				'& [data-level="4"]': {
					mt: em(24, 16),
					mb: em(8, 16),
				},

				// Paragraphs
				'& p': {
					my: em(20, 16),
				},
			},
			lg: {
				// Headings
				fontSize: 'lg',

				'& h1': {
					mt: '0',
					mb: em(40, 48),
					fontSize: em(48, 18),
				},
				'& [data-level="2"]': {
					mt: em(56, 30),
					mb: em(32, 30),
					'& > h2': {
						fontSize: em(32, 18),
					},
				},
				'& [data-level="3"]': {
					mt: em(40, 24),
					mb: em(16, 24),
					'& > h3': {
						fontSize: em(24, 18),
					},
				},
				'& [data-level="4"]': {
					mt: em(32, 18),
					mb: em(8, 18),
				},

				// Paragraphs
				'& p': {
					my: em(24, 18),
				},

				'& blockquote p, & figcaption p': {
					my: '0',
				},
			},
			xl: {
				// Headings
				fontSize: 'xl',

				'& h1': {
					mt: '0',
					mb: em(48, 56),
					fontSize: em(56, 20),
				},
				'& [data-level="2"]': {
					mt: em(56, 36),
					mb: em(32, 36),
					'& > h2': {
						fontSize: em(36, 20),
					},
				},
				'& [data-level="3"]': {
					mt: em(48, 30),
					mb: em(20, 30),
					'& > h3': {
						fontSize: em(28, 20),
					},
				},
				'& [data-level="4"]': {
					mt: em(36, 20),
					mb: em(12, 20),
				},

				// Paragraphs
				'& p': {
					my: em(28, 20),
				},
			},
			'2xl': {
				fontSize: '2xl',

				// Headings
				'& h1': {
					fontSize: em(64, 24),
					mt: '0',
					mb: em(56, 64),
				},
				'& [data-level="2"]': {
					mt: em(72, 48),
					mb: em(40, 48),
					'& > h2': {
						fontSize: em(48, 24),
					},
				},
				'& [data-level="3"]': {
					mt: em(56, 36),
					mb: em(24, 36),
					'& > h3': {
						fontSize: em(36, 24),
					},
				},
				'& [data-level="4"]': {
					mt: em(40, 24),
					mb: em(16, 24),
				},

				// Paragraphs
				'& p': {
					my: em(32, 24),
				},
			},
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});
