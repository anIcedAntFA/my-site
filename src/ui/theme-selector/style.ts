import { css } from '@/styled-system/css';
import { square } from '@/styled-system/patterns';

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
	animationStyle: 'slide-fade-scale-in',
	_closed: {
		animationStyle: 'slide-fade-scale-out',
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
	_selected: {
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

// Skeleton loader while theme is being determined
const skeletonStyles = square({
	size: '8',
	rounded: 'sm',
	bg: 'bg.emphasized',
	animation: 'pulse',
});

// Base styles for stacked icons (position absolute, hidden by default)
const stackedIconStyles = css({
	pos: 'absolute',
	pointerEvents: 'none',
});

// ============================================================================
// Animation Styles (Scale Bounce)
// ============================================================================

const scaleBounceActiveStyles = css({
	opacity: 1,
	transform: 'scale(1)',
	transition: 'opacity {durations.slow}, transform {durations.slower}',
});

const scaleBounceInactiveStyles = css({
	opacity: 0,
	transform: 'scale(0)',
	transition: 'opacity {durations.slow}, transform {durations.slower}',
});

export {
	checkIconStyles,
	itemIndicatorStyles,
	itemLabelStyles,
	itemStyles,
	popoverStyles,
	scaleBounceActiveStyles,
	scaleBounceInactiveStyles,
	selectRootStyles,
	skeletonStyles,
	stackedIconStyles,
};
