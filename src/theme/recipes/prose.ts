import { defineRecipe } from "@pandacss/dev";

import { em } from "@lib/style/calc.lib";

export const prose = defineRecipe({
	className: "prose",
	description: "Typography styles for rich text content",
	base: {
		maxWidth: "68ch",
		color: "fg",

		// Headings
		"& h1, & h2, & h3, & h4": {
			display: "inline",
			color: "fg.headline",
			textWrap: "balance",
			scrollMarginTop: "4rem",
		},
		"& h1": {
			fontWeight: "extrabold",
			lineHeight: "tight",
		},
		"& h2, & h3, & h4": {
			lineHeight: "relaxed",
		},
		"& h1 strong": {
			fontWeight: "black",
		},
		// Copy link button size adjustments
		'& [data-level="2"] button': {
			fontSize: "1.125em",
		},
		"& h2": {
			fontWeight: "bold",
		},
		"& h2 strong": {
			fontWeight: "extrabold",
		},
		"& h3": {
			fontWeight: "semibold",
		},
		'& [data-level="3"] button': {
			fontSize: "1em",
		},
		"& h3 strong": {
			fontWeight: "bold",
		},
		"& h4": {
			fontWeight: "semibold",
		},
		'& [data-level="4"] button': {
			fontSize: "0.875em",
		},
		"& h4 strong": {
			fontWeight: "bold",
		},

		// Paragraphs
		"& p": {
			display: "block",
			lineHeight: "content",
			"&[data-drop-cap]": {
				_firstLetter: {
					float: "left",
					rounded: "sm",
					marginBlockStart: "0.1em",
					me: "0.2em",
					p: "0.1em 0.15em",
					color: "fg.inverted",
					fontFamily: "serif",
					fontSize: "2.5em",
					fontWeight: "bold",
					lineHeight: "calc({lineHeights.content}/2)",
					bg: "accent.inverted",
					shadow: "0.25rem 0.25rem {colors.accent}",
				},
			},
		},

		// Links
		"& a[data-text-link]": {
			display: "inline",
			color: "accent",
			textDecoration: "underline",
			fontWeight: "medium",
			textUnderlineOffset: "0.125em",
			transitionDuration: "fast",
			transitionProperty: "opacity",
			_blank: {
				_after: {
					display: "inline-block",
					w: "0.875em",
					h: "0.875em",
					ml: "0.25em",
					bg: "currentColor",
					transitionDuration: "fast",
					transitionProperty: "opacity",
					content: '""',
					maskImage: "{assets.externalLink}",
					maskSize: "cover",
				},
			},
			_hover: {
				textDecoration: "none",
				opacity: 0.8,
			},
		},

		// Strong and emphasis
		"& strong": {
			color: "fg.headline",
			fontWeight: "semibold",
		},
		"& em": {
			fontStyle: "italic",
		},

		// Lists
		"& ul": {
			my: "1.25em",
			ps: "1.625em",
			listStyleType: "disc",
		},
		"& ol": {
			my: "1.25em",
			ps: "1.625em",
			listStyleType: "decimal",
		},
		"& li": {
			my: "0.5em",
		},
		"& li p": {
			my: "0.75em",
		},
		"& li > *:first-child": {
			marginBlockStart: "1.25em",
		},
		"& li > *:last-child": {
			marginBlockEnd: "1.25em",
		},

		// Nested lists
		"& ul > li": {
			ps: "0.375em",
		},
		"& ol > li": {
			ps: "0.375em",
		},
		"& ul ul, & ul ol, & ol ul, & ol ol": {
			my: "0.75em",
		},

		// Task lists
		"& [data-task-list-item]": {
			display: "flex",
			pos: "relative",
			alignItems: "center",
			"--spacing": "0.5em",
			"--checkbox-size": "1.375em",

			/* Style the label which will act as our custom checkbox container */
			"& label": {
				pos: "relative",
				ps: "calc(var(--checkbox-size) + var(--spacing))",
				/* Style the ::before as the checkbox box */
				_before: {
					left: "0",
					y: " -50% ",
					border: "md",
					bdc: "border.emphasized",
					rounded: "0.25em",
					w: "var(--checkbox-size)",
					h: "var(--checkbox-size)",
					bg: "bg.muted",
					content: '""',
				},

				/* Style the ::after as the checkmark */
				_after: {
					left: "0.4em",
					rotate: "45deg",
					scale: "0",
					y: " -64% ",
					border: "solid {colors.white}",
					borderRightWidth: "0.2em",
					borderBottomWidth: "0.2em",
					borderWidth: "0",
					borderBottomRightRadius: "0.125em",
					w: "0.6em",
					h: "1em",
					content: '""',
				},
				"&::before, &::after": {
					pos: "absolute",
					top: "50%",
					translate: "auto",
					content: '""',
				},
			},

			/* When the hidden checkbox is checked, style the pseudo-elements on the label */
			'& input[type="checkbox"]:checked + label': {
				_before: {
					bdc: "accent",
					bg: "accent",
				},
				_after: {
					rotate: "45deg",
					scale: "1",
					y: "-64%",
				},
			},
			'& input[type="checkbox"]:focus-visible + label': {
				_before: {
					outline: "2px",
					outlineOffset: "2px",
					rounded: "sm",
					outlineColor: "accent",
					outlineStyle: "solid",
				},
			},
		},

		// Highlights
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark#accessibility
		"& mark": {
			rounded: "0.125em",
			px: "0.25em",
			bg: { base: "yellow.300", _dark: "yellow.200" },
			_before: {
				content: ' "[highlight start]" ',
			},
			_after: {
				content: ' "[highlight end]" ',
			},
			"&::before, &::after": {
				srOnly: true,
			},
		},

		// Keyboard input
		"& kbd": {
			display: "inline-block",
			bdc: "border.emphasized",
			rounded: "0.25em",
			borderWidth: "0.1em 0.1em 0.2em",
			px: "0.25em",
			color: "fg",
			fontSize: "0.875em",
			fontWeight: "medium",
			bg: "base.subtle",
			userSelect: "none",
			whiteSpace: "nowrap",
			wordSpacing: "-0.5em",
		},

		// Blockquote
		// Inlined quote
		"& q": {
			fontStyle: "italic",
			_before: {
				y: "-0.25em",
				maskImage: "{assets.quoteDoubleOpen}",
			},
			_after: {
				y: "-0.125em",
				maskImage: "{assets.quoteDoubleClose}",
			},
			"&::before, &::after": {
				display: "inline-block",
				translate: "auto",
				w: "0.75em",
				h: "0.75em",
				bg: "accent",
				content: '""',
				maskSize: "cover",
			},
		},
		// Block quotation
		"& blockquote, & figure": {
			pos: "relative",
			borderTopRightRadius: "var(--border-radius)",
			borderBottomRightRadius: "var(--border-radius)",
			pe: "calc(var(--spacing-right) + var(--border-width))",
			ps: "calc(var(--spacing-right) * 2 + var(--border-width) + var(--icon-size))",
			bg: "bg.emphasized/60",
			fontStyle: "italic",
			_before: {
				pos: "absolute",
				top: "var(--spacing-right)",
				left: "calc(var(--spacing-right) + var(--border-width))",
				w: "var(--icon-size)",
				h: "var(--icon-size)",
				bg: "accent.gradient",
				content: '""',
				maskImage: "{assets.quoteDoubleOpen}",
				maskSize: "cover",
			},
			_after: {
				zIndex: "1",
				pos: "absolute",
				top: "0",
				left: "0",
				bottom: "0",
				w: "var(--border-width)",
				bg: "accent.gradient",
				content: '""',
			},
			"--border-width": "0.5em",
			"--border-radius": "0.75em",
			"--spacing-right": "1em",
			"--icon-size": "2em",
		},
		"& figure": {
			"& blockquote": {
				all: "unset",
				_before: { all: "unset" },
				_after: { all: "unset" },
			},
			"& figcaption": {
				marginBlockStart: "0.5em",
				color: "fg.muted",
				textAlign: "right",
				"& cite": {
					fontStyle: "italic",
				},
			},
		},

		// Callouts
		"& aside": {
			pos: "relative",
			borderInlineStart: "var(--border-width) solid transparent",
			borderTopRightRadius: "var(--border-radius)",
			borderBottomRightRadius: "var(--border-radius)",
			"--border-width": "0.5em",
			"--border-radius": "0.75em",

			"& > :first-child": {
				display: "inline-flex",
				gap: "0.5em",
				alignItems: "center",
				fontSize: "1.125em",
			},

			"& > :last-child": {
				marginBlockStart: "0.5em",
			},

			"& i": {
				display: "inline-block",
				w: "1.5em",
				h: "1.5em",
				bg: "currentColor",
				content: '""',
				maskSize: "cover",
			},

			'&[data-type="note"]': {
				borderInlineStartColor: "blue.600",
				bg: { base: "blue.100", _dark: "blue.950/80" },

				"& i, & strong": {
					color: { base: "blue.800", _dark: "blue.300" },
				},

				"& i": {
					maskImage: "{assets.info}",
				},
			},

			'&[data-type="tip"]': {
				borderInlineStartColor: "emerald.600",
				bg: { base: "emerald.100", _dark: "emerald.950/80" },

				"& i, & strong": {
					color: { base: "emerald.800", _dark: "emerald.300" },
				},

				"& i": {
					maskImage: "{assets.lightbulb}",
				},
			},

			'&[data-type="caution"]': {
				borderInlineStartColor: "amber.600",
				bg: { base: "amber.100", _dark: "amber.950/80" },

				"& i, & strong": {
					color: { base: "amber.800", _dark: "amber.300" },
				},

				"& i": {
					maskImage: "{assets.siren}",
				},
			},

			'&[data-type="danger"]': {
				borderInlineStartColor: "rose.600",
				bg: { base: "rose.100", _dark: "rose.950/80" },

				"& i, & strong": {
					color: { base: "rose.800", _dark: "rose.300" },
				},

				"& i": {
					maskImage: "{assets.bomb}",
				},
			},

			'&[data-type="important"]': {
				borderInlineStartColor: "purple.600",
				bg: { base: "purple.100", _dark: "purple.950/80" },

				"& i, & strong": {
					color: { base: "purple.800", _dark: "purple.300" },
				},

				"& i": {
					maskImage: "{assets.rocket}",
				},
			},
		},

		// Inlined Code
		"& code": {
			display: "inline",
			rounded: "0.25em",
			py: "0.125em",
			px: "0.25em",
			color: "base.fg",
			shadowColor: "base.muted",
			fontFamily: "mono",
			fontSize: "0.875em",
			fontWeight: "medium",
			bg: "base.muted/60",
			shadow: "inset 0 0 0px 1px var(--shadow-color)",
		},

		// Pre and code blocks
		"& pre code": {
			rounded: "0",
			borderWidth: "0",
			padding: "0",
			color: "inherit",
			fontFamily: "inherit",
			fontSize: "inherit",
			fontWeight: "inherit",
			lineHeight: "inherit",
			backgroundColor: "transparent",
			boxShadow: "none",
		},

		// Tables
		"& table": {
			display: "block",
			width: "100%",
			my: em(32, 16),
			textAlign: "left",
			tableLayout: "auto",
			overflowX: "auto",
		},
		"& thead th": {
			border: "sm",
			bdc: "border.emphasized",
			py: em(12, 14),
			px: em(16, 14),
			fontWeight: "semibold",
			textAlign: "start",
			verticalAlign: "middle",
			bg: "bg.subtle",
		},
		"& tbody td": {
			border: "sm",
			bdc: "border.emphasized",
			py: em(8, 14),
			px: em(12, 14),
			verticalAlign: "top",
		},
		"& tbody tr": {
			borderBottom: "sm",
			borderBottomColor: "border.emphasized",
			transitionDuration: "fast",
			transitionProperty: "background-color",
			_hover: {
				bg: "bg.muted",
			},
		},
		"& tbody tr:nth-of-type(even)": {
			bg: "neutral.50",
		},
		"& tfoot": {
			borderTop: "md",
			borderTopColor: "border.emphasized",
			fontWeight: "semibold",
			bg: "bg.subtle",
		},
		"& tfoot td, & tfoot th": {
			border: "sm",
			bdc: "border.emphasized",
			py: em(12, 14),
			px: em(16, 14),
		},
		"& caption": {
			marginBlockStart: em(8, 14),
			color: "fg.muted",
			textAlign: "center",
			captionSide: "bottom",
		},
		"& caption p": {
			fontSize: "0.875em",
		},

		// Horizontal rules
		"& hr": {
			bdc: "border.inverted",
			borderTopWidth: "1px",
			my: "3em",
		},

		// First and last child margins
		"& > :first-child": {
			marginBlockStart: "0",
		},
		"& > :last-child": {
			marginBlockEnd: "0",
		},
	},
	variants: {
		size: {
			sm: {
				// Headings
				fontSize: "sm",

				"& > h1": {
					marginBlockEnd: em(24, 30),
					marginBlockStart: "0",
					fontSize: em(30, 14),
				},
				'& [data-level="2"]': {
					marginBlockEnd: em(16, 20),
					marginBlockStart: em(32, 20),
					"& > h2": {
						fontSize: em(20, 14),
					},
				},
				'& [data-level="3"]': {
					marginBlockEnd: em(8, 18),
					marginBlockStart: em(28, 18),
					"& > h3": {
						fontSize: em(18, 14),
					},
				},
				'& [data-level="4"]': {
					marginBlockEnd: em(8, 14),
					marginBlockStart: em(20, 14),
				},

				// Paragraphs
				"& p": {
					my: em(16, 14),
				},

				// Blockquotes
				"& blockquote, & figure": {
					my: em(20, 14),
					py: em(16, 14),
					"--spacing-right": em(12, 14),
					"--icon-size": em(24, 14),
				},

				// Callouts
				"& aside": {
					my: em(20, 14),
					py: em(12, 14),
					px: em(16, 14),
				},

				// Tables
				"& table": {
					fontSize: em(12, 14),
				},
				"& thead th": {
					py: em(10, 12),
					px: em(12, 12),
				},
				"& tbody td": {
					py: em(6, 12),
					px: em(10, 12),
				},
				"& tfoot td, & tfoot th": {
					py: em(10, 12),
					px: em(12, 12),
				},
				"& caption": {
					marginBlockStart: em(6, 12),
				},

				"& blockquote p, & figcaption p, & aside p, & caption p": {
					my: "0",
				},
			},
			md: {
				fontSize: "md",

				// Headings
				"& > h1": {
					marginBlockEnd: em(32, 36),
					marginBlockStart: "0",
					fontSize: em(36, 16),
				},
				'& [data-level="2"]': {
					marginBlockEnd: em(24, 24),
					marginBlockStart: em(48, 24),
					"& > h2": {
						fontSize: em(24, 16),
					},
				},
				'& [data-level="3"]': {
					marginBlockEnd: em(12, 20),
					marginBlockStart: em(32, 20),
					"& > h3": {
						fontSize: em(20, 16),
					},
				},
				'& [data-level="4"]': {
					marginBlockEnd: em(8, 16),
					marginBlockStart: em(24, 16),
				},

				// Paragraphs
				"& p": {
					my: em(20, 16),
				},

				// Blockquotes
				"& blockquote, & figure": {
					my: em(24, 16),
					py: em(20, 16),
					"--spacing-right": em(16, 16),
					"--icon-size": em(32, 16),
				},

				// Callouts
				"& aside": {
					my: em(24, 16),
					py: em(16, 16),
					px: em(20, 16),
				},

				// Tables
				"& table": {
					fontSize: em(14, 16),
				},
				"& thead th": {
					py: em(12, 14),
					px: em(16, 14),
				},
				"& tbody td": {
					py: em(8, 14),
					px: em(12, 14),
				},
				"& tfoot td, & tfoot th": {
					py: em(12, 14),
					px: em(16, 14),
				},
				"& caption": {
					marginBlockStart: em(8, 14),
				},

				"& blockquote p, & figcaption p, & aside p, & caption p": {
					my: "0",
				},
			},
			lg: {
				// Headings
				fontSize: "lg",

				"& h1": {
					marginBlockEnd: em(40, 48),
					marginBlockStart: "0",
					fontSize: em(48, 18),
				},
				'& [data-level="2"]': {
					marginBlockEnd: em(32, 30),
					marginBlockStart: em(56, 30),
					"& > h2": {
						fontSize: em(32, 18),
					},
				},
				'& [data-level="3"]': {
					marginBlockEnd: em(16, 24),
					marginBlockStart: em(40, 24),
					"& > h3": {
						fontSize: em(24, 18),
					},
				},
				'& [data-level="4"]': {
					marginBlockEnd: em(8, 18),
					marginBlockStart: em(32, 18),
				},

				// Paragraphs
				"& p": {
					my: em(24, 18),
				},

				// Blockquotes
				"& blockquote, & figure": {
					my: em(32, 18),
					py: em(24, 18),
					"--spacing-right": em(18, 18),
					"--icon-size": em(36, 18),
				},

				// Callouts
				"& aside": {
					my: em(32, 18),
					py: em(20, 18),
					px: em(24, 18),
				},

				// Tables
				"& table": {
					fontSize: em(16, 18),
				},
				"& thead th": {
					py: em(14, 16),
					px: em(18, 16),
				},
				"& tbody td": {
					py: em(10, 16),
					px: em(14, 16),
				},
				"& tfoot td, & tfoot th": {
					py: em(14, 16),
					px: em(18, 16),
				},
				"& caption": {
					marginBlockStart: em(10, 16),
				},

				"& blockquote p, & figcaption p, & aside p, & caption p": {
					my: "0",
				},
			},
			xl: {
				// Headings
				fontSize: "xl",

				"& h1": {
					marginBlockEnd: em(48, 56),
					marginBlockStart: "0",
					fontSize: em(56, 20),
				},
				'& [data-level="2"]': {
					marginBlockEnd: em(32, 36),
					marginBlockStart: em(56, 36),
					"& > h2": {
						fontSize: em(36, 20),
					},
				},
				'& [data-level="3"]': {
					marginBlockEnd: em(20, 30),
					marginBlockStart: em(48, 30),
					"& > h3": {
						fontSize: em(28, 20),
					},
				},
				'& [data-level="4"]': {
					marginBlockEnd: em(12, 20),
					marginBlockStart: em(36, 20),
				},

				// Paragraphs
				"& p": {
					my: em(28, 20),
				},

				// Blockquotes
				"& blockquote, & figure": {
					my: em(40, 20),
					py: em(28, 20),
					"--spacing-right": em(20, 20),
					"--icon-size": em(40, 20),
				},

				// Callouts
				"& aside": {
					my: em(40, 20),
					py: em(24, 20),
					px: em(28, 20),
				},

				// Tables
				"& table": {
					fontSize: em(18, 20),
				},
				"& thead th": {
					py: em(16, 18),
					px: em(20, 18),
				},
				"& tbody td": {
					py: em(12, 18),
					px: em(16, 18),
				},
				"& tfoot td, & tfoot th": {
					py: em(16, 18),
					px: em(20, 18),
				},
				"& caption": {
					marginBlockStart: em(12, 18),
				},

				"& blockquote p, & figcaption p, & aside p, & caption p": {
					my: "0",
				},
			},
			"2xl": {
				fontSize: "2xl",

				// Headings
				"& h1": {
					fontSize: em(64, 24),
					marginBlockStart: "0",
					marginBlockEnd: em(56, 64),
				},
				'& [data-level="2"]': {
					marginBlockStart: em(72, 48),
					marginBlockEnd: em(40, 48),
					"& > h2": {
						fontSize: em(48, 24),
					},
				},
				'& [data-level="3"]': {
					marginBlockStart: em(56, 36),
					marginBlockEnd: em(24, 36),
					"& > h3": {
						fontSize: em(36, 24),
					},
				},
				'& [data-level="4"]': {
					marginBlockStart: em(40, 24),
					marginBlockEnd: em(16, 24),
				},

				// Paragraphs
				"& p": {
					my: em(32, 24),
				},

				// Tables
				"& table": {
					fontSize: em(20, 24),
				},
				"& thead th": {
					py: em(18, 20),
					px: em(24, 20),
				},
				"& tbody td": {
					py: em(14, 20),
					px: em(18, 20),
				},
				"& tfoot td, & tfoot th": {
					py: em(18, 20),
					px: em(24, 20),
				},
				"& caption": {
					marginBlockStart: em(14, 20),
				},

				// Blockquotes & Callouts
				"& blockquote, & figure": {
					my: em(48, 24),
					py: em(32, 24),
					"--spacing-right": em(24, 24),
					"--icon-size": em(48, 24),
				},
				"& aside": {
					my: em(48, 24),
					py: em(28, 24),
					px: em(32, 24),
				},

				"& blockquote p, & figcaption p, & aside p, & caption p": {
					my: "0",
				},
			},
		},
	},
	defaultVariants: {
		size: "lg",
	},
});
