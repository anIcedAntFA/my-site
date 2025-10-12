import type { TextStyles } from '@pandacss/dev';

export const textStyles: TextStyles = {
	// Body text styles
	body: {
		description: 'Default body text style',
		value: {
			fontFamily: 'body',
			fontSize: '1rem',
			fontWeight: 'normal',
			lineHeight: '1.75',
		},
	},
	'body-sm': {
		description: 'Small body text style',
		value: {
			fontFamily: 'body',
			fontSize: '0.875rem',
			fontWeight: 'normal',
			lineHeight: '1.7',
		},
	},
	'body-lg': {
		description: 'Large body text style',
		value: {
			fontFamily: 'body',
			fontSize: '1.125rem',
			fontWeight: 'normal',
			lineHeight: '1.8',
		},
	},

	// Heading styles
	'heading-xs': {
		description: 'Extra small heading',
		value: {
			fontFamily: 'heading',
			fontSize: '0.75rem',
			fontWeight: '600',
			lineHeight: '1.5',
			letterSpacing: '0.05em',
			textTransform: 'uppercase',
		},
	},
	'heading-sm': {
		description: 'Small heading',
		value: {
			fontFamily: 'heading',
			fontSize: '0.875rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},
	},
	'heading-md': {
		description: 'Medium heading',
		value: {
			fontFamily: 'heading',
			fontSize: '1rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},
	},
	'heading-lg': {
		description: 'Large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '1.125rem',
			fontWeight: '600',
			lineHeight: '1.6',
		},
	},
	'heading-xl': {
		description: 'Extra large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '1.25rem',
			fontWeight: '700',
			lineHeight: '1.5',
		},
	},
	'heading-2xl': {
		description: '2X large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '1.5rem',
			fontWeight: '700',
			lineHeight: '1.4',
		},
	},
	'heading-3xl': {
		description: '3X large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '1.875rem',
			fontWeight: '700',
			lineHeight: '1.3',
		},
	},
	'heading-4xl': {
		description: '4X large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '2.25rem',
			fontWeight: '800',
			lineHeight: '1.2',
		},
	},
	'heading-5xl': {
		description: '5X large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '3rem',
			fontWeight: '800',
			lineHeight: '1.1',
		},
	},
	'heading-6xl': {
		description: '6X large heading',
		value: {
			fontFamily: 'heading',
			fontSize: '3.75rem',
			fontWeight: '900',
			lineHeight: '1',
		},
	},

	// Display styles
	'display-sm': {
		description: 'Small display text',
		value: {
			fontFamily: 'heading',
			fontSize: '4.5rem',
			fontWeight: '900',
			lineHeight: '1',
			letterSpacing: '-0.025em',
		},
	},
	'display-md': {
		description: 'Medium display text',
		value: {
			fontFamily: 'heading',
			fontSize: '5.625rem',
			fontWeight: '900',
			lineHeight: '1',
			letterSpacing: '-0.025em',
		},
	},
	'display-lg': {
		description: 'Large display text',
		value: {
			fontFamily: 'heading',
			fontSize: '7.5rem',
			fontWeight: '900',
			lineHeight: '1',
			letterSpacing: '-0.025em',
		},
	},

	// Utility styles
	lead: {
		description: 'Lead text style for introductions',
		value: {
			fontFamily: 'body',
			fontSize: '1.25rem',
			fontWeight: '300',
			lineHeight: '1.6',
		},
	},
	caption: {
		description: 'Caption text style',
		value: {
			fontFamily: 'body',
			fontSize: '0.75rem',
			fontWeight: 'normal',
			lineHeight: '1.5',
			color: 'muted',
		},
	},
	overline: {
		description: 'Overline text style',
		value: {
			fontFamily: 'body',
			fontSize: '0.75rem',
			fontWeight: '600',
			lineHeight: '1.5',
			letterSpacing: '0.1em',
			textTransform: 'uppercase',
		},
	},
};
