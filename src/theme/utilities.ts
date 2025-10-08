import { defineUtility } from '@pandacss/dev';

export const borderColor = defineUtility({
	className: 'borderColor',
	shorthand: 'bdc',
	values: 'colors',
	group: 'Border',
	transform: (value) => ({ borderColor: value }),
});
