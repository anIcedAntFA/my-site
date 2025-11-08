import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
	xs: {
		value: {
			base: '0px 1px 2px {colors.slate.900/10}, 0px 0px 1px {colors.slate.900/20}',
			_dark:
				'0px 1px 1px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/20}',
		},
	},
	sm: {
		value: {
			base: '0px 2px 4px {colors.slate.900/10}, 0px 0px 1px {colors.slate.900/30}',
			_dark:
				'0px 2px 4px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/30}',
		},
	},
	md: {
		value: {
			base: '0px 4px 8px {colors.slate.900/10}, 0px 0px 1px {colors.slate.900/30}',
			_dark:
				'0px 4px 8px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/30}',
		},
	},
	lg: {
		value: {
			base: '0px 8px 16px {colors.slate.900/10}, 0px 0px 1px {colors.slate.900/30}',
			_dark:
				'0px 8px 16px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/30}',
		},
	},
	xl: {
		value: {
			base: '0px 16px 24px {colors.slate.900/10}, 0px 0px 1px {colors.slate.900/30}',
			_dark:
				'0px 16px 24px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/30}',
		},
	},
	'2xl': {
		value: {
			base: '0px 24px 40px {colors.slate.900/16}, 0px 0px 1px {colors.slate.900/30}',
			_dark:
				'0px 24px 40px {colors.black/64}, 0px 0px 1px inset {colors.slate.300/30}',
		},
	},
	inner: {
		value: {
			base: 'inset 0 2px 4px 0 {colors.black/5}',
			_dark: 'inset 0 2px 4px 0 colors.black',
		},
	},
	inset: {
		value: {
			base: 'inset 0 0 0 1px {colors.black/5}',
			_dark: 'inset 0 0 0 1px {colors.slate.300/5}',
		},
	},
});
