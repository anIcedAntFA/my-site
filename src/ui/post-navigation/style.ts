import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';

// ============================================================================
// Post Navigation Layout Styles
// ============================================================================

const navStyles = grid({
	gridTemplateColumns: '1fr 1fr',
	gap: '6',
	mt: '6',
	mdDown: {
		gridTemplateColumns: '1fr',
		'& > div:first-child + a': {
			gridColumnStart: '1',
			justifySelf: 'center',
		},
	},
});

// ============================================================================
// Card Styles (Button-like with outlined style)
// ============================================================================

// Root wrapper - contains the shadow/border background
const cardRootStyles = css({
	pos: 'relative',
	cursor: 'pointer',
	bg: 'accent.fg',
	rounded: 'lg',
	border: 'none',
	textDecoration: 'none',
	userSelect: 'none',
	_focusVisible: {
		outlineOffset: '5px',
		outline: '2px solid',
		outlineColor: 'accent.focusRing',
	},
	'&[data-direction="previous"]': {
		justifySelf: 'start',
	},
	'&[data-direction="next"]': {
		justifySelf: 'end',
	},
	mdDown: {
		'&[data-direction="previous"], &[data-direction="next"]': {
			justifySelf: 'stretch',
		},
	},
	// Hover effect - lift up the content
	_supportHover: {
		_hover: {
			'& > :first-child': {
				transform: 'translate(-3px, -5px)',
			},
		},
	},
	// Active effect - press down
	_active: {
		'& > :first-child': {
			transform: 'translateY(0)',
		},
	},
});

// Content container - the actual card content with border and background
const cardContentStyles = css({
	pos: 'relative',
	display: 'flex',
	gap: '3',
	h: 'full',
	p: '4',
	border: 'md',
	bdc: 'accent.fg',
	rounded: 'lg',
	bg: 'bg.surface',
	// Default offset (3D effect)
	transform: 'translate(-2px, -4px)',
	transitionDuration: 'normal',
	transitionProperty: 'transform',
	mdDown: {
		py: '5',
		px: '4',
	},
	'&[data-direction="previous"]': {
		textAlign: 'left',
	},
	'&[data-direction="next"]': {
		textAlign: 'right',
	},
});

// ============================================================================
// Content Styles
// ============================================================================

const contentStyles = css({
	display: 'flex',
	flex: '1 0 0',
	flexDirection: 'column',
	gap: '0.5',
	mt: '0',
});

const labelStyles = css({
	color: 'fg.muted',
	fontWeight: 'medium',
	textStyle: 'sm',
});

const titleStyles = css({
	color: 'accent',
	textStyle: 'md',
	fontFamily: 'heading',
	letterSpacing: 'wide',
});
// ============================================================================
// Icon Styles
// ============================================================================

const iconStyles = css({
	alignSelf: 'center',
	color: 'fg.subtle',
	textStyle: 'md',
	transitionProperty: 'color',
	transitionDuration: 'fast',
	_supportHover: {
		_groupHover: {
			color: 'fg.muted',
			animation: 'nudge-right',
			animationDuration: 'slower',
		},
	},
});

// // Icon animation styles - applied conditionally based on direction
// const prevIconStyles = css({
// 	_supportHover: {
// 		'.group:hover &': {
// 			color: 'fg.muted',
// 			animation: 'nudge-right',
// 			animationDuration: 'slowest',
// 		},
// 	},
// });

// const nextIconStyles = css({
// 	_supportHover: {
// 		'.group:hover &': {
// 			color: 'fg.muted',
// 			animation: 'nudge-right',
// 			animationDuration: 'slower',
// 		},
// 	},
// });

export {
	cardContentStyles,
	cardRootStyles,
	contentStyles,
	iconStyles,
	labelStyles,
	navStyles,
	titleStyles,
};
