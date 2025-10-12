import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
	// Background tokens
	bg: {
		// Page background (the canvas)
		DEFAULT: {
			value: { base: '{colors.white}', _dark: '{colors.black}' },
		},

		// Very light background used to separate large layout areas (sidebar, page sections)
		subtle: {
			value: { base: '{colors.slate.50}', _dark: '{colors.slate.950}' },
		},

		// Muted blocks (cards, post previews) — sits above subtle
		muted: {
			value: { base: '{colors.slate.100}', _dark: '{colors.slate.900}' },
		},

		// Slightly stronger emphasis for callouts, banners, or hover backgrounds
		emphasized: {
			value: { base: '{colors.slate.200}', _dark: '{colors.slate.800}' },
		},

		// Inverted background (for strong contrast sections / overlays)
		inverted: {
			value: { base: '{colors.black}', _dark: '{colors.white}' },
		},

		// Panel = elevated panels / modals / dialogs — slightly different dark mapping
		panel: {
			value: { base: '{colors.white}', _dark: '{colors.slate.950}' },
		},

		// Surface = the "paper" or container for main content (article frame, editor)
		// Distinct from muted: surface is the primary content panel (usually pure white)
		surface: {
			value: { base: '{colors.white}', _dark: '{colors.slate.900}' },
		},

		info: {
			value: { base: '{colors.blue.50}', _dark: '{colors.blue.900}' },
		},
		success: {
			value: { base: '{colors.emerald.50}', _dark: '{colors.emerald.900}' },
		},
		warning: {
			value: { base: '{colors.amber.50}', _dark: '{colors.amber.900}' },
		},
		error: {
			value: { base: '{colors.rose.50}', _dark: '{colors.rose.900}' },
		},
	},

	// Border tokens
	border: {
		DEFAULT: {
			value: { base: '{colors.slate.200}', _dark: '{colors.slate.800}' },
		},
		subtle: {
			value: { base: '{colors.slate.50}', _dark: '{colors.slate.950}' },
		},
		muted: {
			value: { base: '{colors.slate.100}', _dark: '{colors.slate.900}' },
		},
		emphasized: {
			value: { base: '{colors.slate.300}', _dark: '{colors.slate.700}' },
		},
		inverted: {
			value: { base: '{colors.slate.800}', _dark: '{colors.slate.200}' },
		},
		info: {
			value: { base: '{colors.blue.500}', _dark: '{colors.blue.400}' },
		},
		success: {
			value: { base: '{colors.emerald.500}', _dark: '{colors.emerald.400}' },
		},
		warning: {
			value: { base: '{colors.amber.500}', _dark: '{colors.amber.400}' },
		},
		error: {
			value: { base: '{colors.rose.500}', _dark: '{colors.rose.400}' },
		},
	},

	// Text tokens
	fg: {
		// primary readable text color
		DEFAULT: {
			value: { base: '{colors.black}', _dark: '{colors.slate.50}' },
		},
		// muted / meta text
		muted: {
			value: { base: '{colors.slate.600}', _dark: '{colors.slate.400}' },
		},
		// subtle (less emphasis than muted)
		subtle: {
			value: { base: '{colors.slate.400}', _dark: '{colors.slate.500}' },
		},
		// inverted text (used on dark backgrounds)
		inverted: {
			value: { base: '{colors.slate.50}', _dark: '{colors.black}' },
		},
		info: {
			value: { base: '{colors.blue.600}', _dark: '{colors.blue.300}' },
		},
		success: {
			value: { base: '{colors.emerald.600}', _dark: '{colors.emerald.300}' },
		},
		warning: {
			value: { base: '{colors.amber.600}', _dark: '{colors.amber.300}' },
		},
		error: {
			value: { base: '{colors.rose.500}', _dark: '{colors.rose.400}' },
		},
	},

	base: {
		DEFAULT: {
			value: { base: '{colors.slate.600}', _dark: '{colors.slate.600}' },
		},
		contrast: {
			value: { base: '{colors.white}', _dark: '{colors.black}' },
		},
		fg: {
			value: { base: '{colors.slate.800}', _dark: '{colors.slate.200}' },
		},
		subtle: {
			value: { base: '{colors.slate.100}', _dark: '{colors.slate.900}' },
		},
		muted: {
			value: { base: '{colors.slate.200}', _dark: '{colors.slate.800}' },
		},
		emphasized: {
			value: { base: '{colors.slate.300}', _dark: '{colors.slate.700}' },
		},
		solid: {
			value: { base: '{colors.slate.900}', _dark: '{colors.white}' },
		},
		focusRing: {
			value: { base: '{colors.slate.400}', _dark: '{colors.slate.400}' },
		},
	},

	// Accent tokens
	accent: {
		DEFAULT: {
			value: { base: '{colors.indigo.600}', _dark: '{colors.indigo.500}' },
		},
		contrast: {
			value: { base: '{colors.white}', _dark: '{colors.black}' },
		},
		fg: {
			value: { base: '{colors.indigo.800}', _dark: '{colors.indigo.200}' },
		},
		subtle: {
			value: { base: '{colors.indigo.100}', _dark: '{colors.indigo.900}' },
		},
		muted: {
			value: { base: '{colors.indigo.200}', _dark: '{colors.indigo.800}' },
		},
		emphasized: {
			value: { base: '{colors.indigo.300}', _dark: '{colors.indigo.700}' },
		},
		solid: {
			value: { base: '{colors.indigo.600}', _dark: '{colors.indigo.600}' },
		},
		focusRing: {
			value: { base: '{colors.indigo.500}', _dark: '{colors.indigo.500}' },
		},
		gradient: {
			value: {
				base: 'linear-gradient(144deg, {colors.indigo.500} 20%, {colors.indigo.600} 80%)',
				_dark:
					'linear-gradient(144deg, {colors.indigo.400} 30%, {colors.indigo.500} 70%)',
			},
		},
	},

	link: {
		DEFAULT: {
			value: { base: '{colors.blue.600}', _dark: '{colors.blue.500}' },
		},
		visited: {
			value: { base: '{colors.violet.600}', _dark: '{colors.violet.500}' },
		},
	},
});
