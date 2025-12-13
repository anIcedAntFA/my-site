import { css, cx } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';
import { icon } from '@/styled-system/recipes';

// ============================================================================
// Post Navigation Layout Styles
// ============================================================================

const navStyles = grid({
	mt: '6',
	gridTemplateColumns: {
		base: '1fr',
		md: '1fr 1fr',
	},
	gap: {
		base: '6',
		'3xl': '8',
	},
	'& > div:first-child + a': {
		gridColumnStart: '1',
		justifySelf: 'center',
	},
});

// ============================================================================
// Card Styles (Button-like with outlined style)
// ============================================================================

// Root wrapper - contains the shadow/border background
const _cardRootStyles = cx(
	'group',
	css({
		pos: 'relative',
		bg: 'accent',
		rounded: 'lg',
		userSelect: 'none',
		_focusVisible: {
			outlineOffset: '6px',
		},
		_previous: {
			justifySelf: 'start',
		},
		_next: {
			justifySelf: 'end',
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
	}),
);

// Content container - the actual card content with border and background
const _cardContentStyles = css({
	pos: 'relative',
	display: 'flex',
	gap: '3',
	h: 'full',
	p: {
		base: '3',
		xs: '4',
	},
	border: 'md',
	bdc: 'accent',
	rounded: 'lg',
	bg: 'bg.surface',
	transform: 'translate(-2px, -4px)',
	transitionDuration: 'normal',
	transitionProperty: 'transform',
	_previous: {
		textAlign: 'left',
	},
	_next: {
		textAlign: 'right',
	},
});

// ============================================================================
// Content Styles
// ============================================================================

const _contentStyles = css({
	display: 'flex',
	flex: '1 0 0',
	flexDirection: 'column',
	gap: '1',
	mt: '0',
});

const _labelStyles = css({
	color: 'fg.muted',
	fontWeight: 'medium',
	textStyle: {
		base: 'xs',
		xs: 'sm',
		xl: 'md',
		'3xl': 'lg',
	},
});

const _titleStyles = css({
	color: 'accent.fg',
	textStyle: {
		base: 'sm',
		xs: 'md',
		xl: 'lg',
		'3xl': 'xl',
	},
});
// ============================================================================
// Icon Styles
// ============================================================================

const iconClass = icon();
const _iconStyles = cx(
	iconClass,
	css({
		alignSelf: 'center',
		boxSize: {
			base: '5',
			md: '6',
			'3xl': '7',
		},
		color: 'fg.muted',
		transitionProperty: 'color',
		transitionDuration: 'fast',
		_supportHover: {
			color: 'fg.subtle',
			_groupHover: {
				color: 'fg.muted',
				animation: 'nudge-right',
				animationDuration: 'slower',
			},
			'.group[data-direction="previous"] &': {
				maskImage: '{assets.arrowRight}',
				rotate: '180deg',
			},
			'.group[data-direction="next"] &': {
				maskImage: '{assets.arrowRight}',
			},
		},
	}),
);

export { navStyles };
