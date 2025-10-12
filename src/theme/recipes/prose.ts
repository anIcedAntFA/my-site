import { defineRecipe } from '@pandacss/dev';

export const prose = defineRecipe({
	className: 'prose',
	description: 'Typography styles for rich text content',
	base: {
		maxWidth: '65ch',
		color: 'fg',
		lineHeight: '1.75',

		// Headings
		'& h1': {
			marginTop: '0',
			marginBottom: '0.8888889em',
			color: 'fg.headline',
			fontSize: '2.25rem',
			fontWeight: '800',
			lineHeight: '1.1111111',
		},
		'& h2': {
			marginTop: '2em',
			marginBottom: '1em',
			color: 'fg.headline',
			fontSize: '1.5rem',
			fontWeight: '700',
			lineHeight: '1.3333333',
		},
		'& h3': {
			marginTop: '1.6em',
			marginBottom: '0.6em',
			color: 'fg.headline',
			fontSize: '1.25rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},
		'& h4': {
			marginTop: '1.5em',
			marginBottom: '0.5em',
			color: 'fg.headline',
			fontSize: '1.125rem',
			fontWeight: '600',
			lineHeight: '1.5555556',
		},
		'& h5': {
			marginTop: '1.5em',
			marginBottom: '0.5em',
			color: 'fg.headline',
			fontSize: '1rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},
		'& h6': {
			marginTop: '1.5em',
			marginBottom: '0.5em',
			color: 'fg.headline',
			fontSize: '0.875rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},

		// Paragraphs
		'& p': {
			marginTop: '1.25em',
			marginBottom: '1.25em',
		},

		// Links
		'& a': {
			color: 'accent',
			textDecoration: 'underline',
			fontWeight: '500',
			textUnderlineOffset: '0.125em',
			transitionDuration: 'fast',
			transitionProperty: 'color, text-decoration-color',
			_hover: {
				color: 'accent.emphasized',
				textDecorationColor: 'accent.emphasized',
			},
		},

		// Strong and emphasis
		'& strong': {
			color: 'fg.headline',
			fontWeight: '600',
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

		// Blockquotes
		'& blockquote': {
			borderLeftWidth: '0.25rem',
			borderLeftColor: 'border.emphasized',
			marginTop: '1.6em',
			marginBottom: '1.6em',
			paddingLeft: '1em',
			color: 'fg.headline',
			fontWeight: '500',
			fontStyle: 'italic',
			quotes: '"\\201C""\\201D""\\2018""\\2019"',
		},
		'& blockquote p:first-of-type::before': {
			content: 'open-quote',
		},
		'& blockquote p:last-of-type::after': {
			content: 'close-quote',
		},

		// Code
		'& code': {
			borderRadius: 'sm',
			padding: '0.125rem 0.25rem',
			color: 'fg.headline',
			fontFamily: 'mono',
			fontSize: '0.875em',
			fontWeight: '600',
			backgroundColor: 'bg.muted',
		},
		'& code::before': {
			content: '"\\`"',
		},
		'& code::after': {
			content: '"\\`"',
		},

		// Pre and code blocks
		'& pre': {
			borderRadius: 'md',
			marginTop: '1.7142857em',
			marginBottom: '1.7142857em',
			paddingLeft: '1.1428571em',
			paddingRight: '1.1428571em',
			paddingTop: '0.8571429em',
			paddingBottom: '0.8571429em',
			color: 'fg.inverted',
			fontSize: '0.875em',
			fontWeight: '400',
			lineHeight: '1.7142857',
			backgroundColor: 'bg.emphasized',
			overflowX: 'auto',
		},
		'& pre code': {
			borderRadius: '0',
			borderWidth: '0',
			padding: '0',
			color: 'inherit',
			fontFamily: 'inherit',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			lineHeight: 'inherit',
			backgroundColor: 'transparent',
		},
		'& pre code::before': {
			content: 'none',
		},
		'& pre code::after': {
			content: 'none',
		},

		// Tables
		'& table': {
			width: '100%',
			marginTop: '2em',
			marginBottom: '2em',
			fontSize: '0.875em',
			lineHeight: '1.7142857',
			textAlign: 'left',
			tableLayout: 'auto',
		},
		'& thead': {
			borderBottomWidth: '1px',
			borderBottomColor: 'border',
		},
		'& thead th': {
			paddingLeft: '0.5714286em',
			paddingRight: '0.5714286em',
			paddingBottom: '0.5714286em',
			color: 'fg.headline',
			fontWeight: '600',
			verticalAlign: 'bottom',
		},
		'& tbody tr': {
			borderBottomWidth: '1px',
			borderBottomColor: 'border.muted',
		},
		'& tbody tr:last-child': {
			borderBottomWidth: '0',
		},
		'& tbody td': {
			paddingLeft: '0.5714286em',
			paddingRight: '0.5714286em',
			paddingTop: '0.5714286em',
			paddingBottom: '0.5714286em',
			verticalAlign: 'baseline',
		},

		// Images and figures
		'& img': {
			marginTop: '2em',
			marginBottom: '2em',
		},
		'& figure': {
			marginTop: '2em',
			marginBottom: '2em',
		},
		'& figure > *': {
			marginTop: '0',
			marginBottom: '0',
		},
		'& figcaption': {
			marginTop: '0.8571429em',
			color: 'fg.muted',
			fontSize: '0.875em',
			lineHeight: '1.4285714',
			textAlign: 'center',
		},

		// Horizontal rules
		'& hr': {
			borderColor: 'border',
			borderTopWidth: '1px',
			marginTop: '3em',
			marginBottom: '3em',
		},

		// First and last child margins
		'& > :first-child': {
			marginTop: '0',
		},
		'& > :last-child': {
			marginBottom: '0',
		},
	},
	variants: {
		// Size variants
		size: {
			sm: {
				fontSize: '0.875rem',
				lineHeight: '1.7142857',
				'& p': {
					marginTop: '1.1428571em',
					marginBottom: '1.1428571em',
				},
				'& h1': {
					marginTop: '0',
					marginBottom: '0.8em',
					fontSize: '1.875rem',
					lineHeight: '1.0666667',
				},
				'& h2': {
					marginTop: '1.8666667em',
					marginBottom: '1.0666667em',
					fontSize: '1.25rem',
					lineHeight: '1.3333333',
				},
				'& h3': {
					marginTop: '1.5555556em',
					marginBottom: '0.6666667em',
					fontSize: '1.125rem',
					lineHeight: '1.5555556',
				},
				'& blockquote': {
					marginTop: '1.3333333em',
					marginBottom: '1.3333333em',
					paddingLeft: '1.1111111em',
				},
			},
			base: {
				// Default styles already defined in base
			},
			lg: {
				fontSize: '1.125rem',
				lineHeight: '1.7777778',
				'& p': {
					marginTop: '1.3333333em',
					marginBottom: '1.3333333em',
				},
				'& h1': {
					marginTop: '0',
					marginBottom: '0.8333333em',
					fontSize: '2.6666667rem',
					lineHeight: '1',
				},
				'& h2': {
					marginTop: '1.8666667em',
					marginBottom: '1.0666667em',
					fontSize: '1.6666667rem',
					lineHeight: '1.3333333',
				},
				'& h3': {
					marginTop: '1.6666667em',
					marginBottom: '0.6666667em',
					fontSize: '1.3333333rem',
					lineHeight: '1.5',
				},
				'& blockquote': {
					marginTop: '1.6666667em',
					marginBottom: '1.6666667em',
					paddingLeft: '1em',
				},
			},
			xl: {
				fontSize: '1.25rem',
				lineHeight: '1.8',
				'& p': {
					marginTop: '1.2em',
					marginBottom: '1.2em',
				},
				'& h1': {
					marginTop: '0',
					marginBottom: '0.8571429em',
					fontSize: '2.8em',
					lineHeight: '1',
				},
				'& h2': {
					marginTop: '1.5555556em',
					marginBottom: '0.8888889em',
					fontSize: '1.8em',
					lineHeight: '1.1111111',
				},
				'& h3': {
					marginTop: '1.6em',
					marginBottom: '0.6666667em',
					fontSize: '1.5em',
					lineHeight: '1.3333333',
				},
				'& blockquote': {
					marginTop: '1.6em',
					marginBottom: '1.6em',
					paddingLeft: '1.0666667em',
				},
			},
		},
		// Color variants
		variant: {
			default: {
				// Default colors already defined in base
			},
			muted: {
				color: 'fg.muted',
				'& h1, & h2, & h3, & h4, & h5, & h6': {
					color: 'fg.headline',
				},
				'& strong': {
					color: 'fg.headline',
				},
				'& blockquote': {
					color: 'fg.headline',
				},
			},
			inverted: {
				color: 'fg.inverted',
				'& h1, & h2, & h3, & h4, & h5, & h6': {
					color: 'fg.inverted',
				},
				'& strong': {
					color: 'fg.inverted',
				},
				'& blockquote': {
					borderLeftColor: 'border.inverted',
					color: 'fg.inverted',
				},
				'& code': {
					color: 'fg.inverted',
					backgroundColor: 'bg.inverted.muted',
				},
				'& hr': {
					borderColor: 'border.inverted',
				},
			},
		},
		// Lead paragraph variant
		lead: {
			true: {
				'& > p:first-child': {
					marginTop: '1.2em',
					marginBottom: '1.2em',
					color: 'fg.muted',
					fontSize: '1.25em',
					lineHeight: '1.6',
				},
			},
			false: {},
		},
	},
	defaultVariants: {
		size: 'base',
		variant: 'default',
		lead: false,
	},
});
