import { defineGlobalStyles } from '@pandacss/dev';

export const globalCSS = defineGlobalStyles({
	'*, *::before, *::after': {
		transitionTimingFunction: 'ease-in-out',
	},
	body: {
		bg: 'bg',
		color: 'fg',
		minHeight: '100vh',
		lineHeight: 'normal',
		scrollBehavior: 'smooth',
	},
	"a, summary, button, input, [tabindex]:not([tabindex='-1'])": {
		outline: 'none',
		_focusVisible: {
			outline: '2px',
			outlineColor: 'accent',
			outlineOffset: '2px',
			outlineStyle: 'solid',
			rounded: 'sm',
		},
	},
	"input[type='search']": {
		'&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration':
			{
				WebkitAppearance: 'none',
			},
	},
	// '*::selection': {
	// 	bg: 'accent.subtle/80',
	// },
});
