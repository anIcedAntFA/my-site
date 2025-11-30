import { defineUtility } from '@pandacss/dev';

export const borderColor = defineUtility({
	className: 'borderColor',
	shorthand: 'bdc',
	values: 'colors',
	group: 'Border',
	transform: (value) => ({ borderColor: value }),
});

export const borderTop = defineUtility({
	className: 'borderTop',
	shorthand: 'bt',
	values: 'borders',
	group: 'Border',
	transform: (value) => ({ borderTop: value }),
});

export const borderLeft = defineUtility({
	className: 'borderLeft',
	shorthand: 'bl',
	values: 'borders',
	group: 'Border',
	transform: (value) => ({ borderLeft: value }),
});

export const borderRight = defineUtility({
	className: 'borderRight',
	shorthand: 'br',
	values: 'borders',
	group: 'Border',
	transform: (value) => ({ borderRight: value }),
});

export const borderBottom = defineUtility({
	className: 'borderBottom',
	shorthand: 'bb',
	values: 'borders',
	group: 'Border',
	transform: (value) => ({ borderBottom: value }),
});
