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
			value: { base: '{colors.base.50}', _dark: '{colors.base.900}' },
		},

		// Muted blocks (cards, post previews) — sits above subtle
		muted: {
			value: {
				base: '{colors.base.100}',
				_dark: '{colors.base.800}',
			},
		},

		// Slightly stronger emphasis for callouts, banners, or hover backgrounds
		emphasized: {
			value: { base: '{colors.base.200}', _dark: '{colors.base.700}' },
		},

		// Surface = the "paper" or container for main content (article frame, editor)
		// Distinct from muted: surface is the primary content panel (usually pure white)
		surface: {
			value: { base: '{colors.white}', _dark: '{colors.base.900}' },
		},

		// Panel = elevated panels / modals / dialogs — slightly different dark mapping
		panel: {
			value: { base: '{colors.white}', _dark: '{colors.base.950}' },
		},

		// Inverted background (for strong contrast sections / overlays)
		inverted: {
			value: { base: '{colors.black}', _dark: '{colors.white}' },
		},

		// hover slate for emphasized surfaces
		'emphasized.hover': {
			value: {
				base: '{colors.base.100}',
				_dark: '{colors.base.700}',
			},
		},
	},

	// Foreground tokens
	fg: {
		// primary readable text color
		DEFAULT: {
			value: { base: '{colors.base.900}', _dark: '{colors.base.50}' },
		},

		// muted / meta text
		muted: {
			value: { base: '{colors.base.600}', _dark: '{colors.base.400}' },
		},

		// subtle (less emphasis than muted)
		subtle: {
			value: { base: '{colors.base.500}', _dark: '{colors.base.500}' },
		},

		// inverted text (used on dark backgrounds)
		inverted: {
			value: { base: '{colors.white}', _dark: '{colors.black}' },
		},

		// headline — reserved for titles (optionally brand-colored in dark mode)
		headline: {
			value: { base: '{colors.base.950}', _dark: '{colors.primary.300}' },
		},
	},

	// Accent tokens (primary palette mappings)
	accent: {
		DEFAULT: {
			value: { base: '{colors.primary.600}', _dark: '{colors.primary.500}' },
		},
		contrast: {
			value: {
				base: 'white',
				_dark: 'white',
			},
		},
		fg: {
			value: {
				base: '{colors.emerald.700}',
				_dark: '{colors.emerald.300}',
			},
		},
		subtle: {
			value: {
				base: '{colors.emerald.100}',
				_dark: '{colors.emerald.900}',
			},
		},
		muted: {
			value: {
				base: '{colors.emerald.200}',
				_dark: '{colors.emerald.800}',
			},
		},
		emphasized: {
			value: {
				base: '{colors.emerald.300}',
				_dark: '{colors.emerald.700}',
			},
		},
		solid: {
			value: {
				base: '{colors.emerald.600}',
				_dark: '{colors.emerald.600}',
			},
		},
	},

	base: {
		DEFAULT: {
			value: {
				base: '{colors.slate.600}',
				_dark: '{colors.slate.500}',
			},
		},
		contrast: {
			value: {
				base: '{colors.white}',
				_dark: '{colors.black}',
			},
		},
		fg: {
			value: {
				base: '{colors.slate.800}',
				_dark: '{colors.slate.200}',
			},
		},
		subtle: {
			value: {
				base: '{colors.slate.100}',
				_dark: '{colors.slate.900}',
			},
		},
		muted: {
			value: {
				base: '{colors.slate.200}',
				_dark: '{colors.slate.800}',
			},
		},
		emphasized: {
			value: {
				base: '{colors.slate.300}',
				_dark: '{colors.slate.700}',
			},
		},
		solid: {
			value: {
				base: '{colors.slate.900}',
				_dark: '{colors.white}',
			},
		},
	},
});
