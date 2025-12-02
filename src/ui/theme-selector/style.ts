import { css } from '@/styled-system/css';

const selectRootStyles = css({
	pos: 'relative',
	w: 'fit-content',
});

const popoverStyles = css({
	minW: '32',
	bg: 'bg.surface',
	border: '1px solid',
	bdc: 'border',
	rounded: 'lg',
	boxShadow: 'lg',
	p: '1.5 !important',
	zIndex: 'popover',
	// Animation
	animation: 'fadeIn 0.25s ease-out',
	transformOrigin: 'top',
	'&[data-closed]': {
		animation: 'fadeOut 0.15s ease-in',
	},
});

const itemStyles = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '3',
	px: '3',
	py: '1.5',
	rounded: 'md',
	cursor: 'pointer',
	fontSize: 'md',
	fontWeight: 'medium',
	color: 'fg.muted',
	transitionProperty: 'background-color,color',
	userSelect: 'none',
	_supportHover: {
		'&:not([data-selected]):hover': {
			bg: 'accent.muted',
			color: 'fg',
		},
	},
	'&[data-highlighted]:not([data-selected])': {
		bg: 'bg.emphasized',
		outline: 'none',
	},
	'&[data-selected]': {
		color: 'accent',
		cursor: 'auto',
		fontWeight: 'bold',
	},
});

const itemLabelStyles = css({
	flex: 1,
});

const itemIndicatorStyles = css({
	display: 'flex',
	alignItems: 'center',
	flexShrink: 0,
	color: 'accent',
});

const checkIconStyles = css({
	maskImage: '{assets.check}',
});

export {
	checkIconStyles,
	itemIndicatorStyles,
	itemLabelStyles,
	itemStyles,
	popoverStyles,
	selectRootStyles,
};
