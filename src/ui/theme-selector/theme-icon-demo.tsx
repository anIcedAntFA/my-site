/**
 * Theme Icon Animation Demo - FIXED VERSION
 *
 * Problem: CSS mask-image cannot be animated/transitioned between different images.
 * Solution: Stack all 3 icons and animate their opacity/transform individually.
 *
 * This creates smooth transitions by:
 * 1. Rendering all icons at once (positioned absolute)
 * 2. Showing only the active icon (opacity: 1)
 * 3. Animating opacity/transform on icon change
 */

import { $, component$, useSignal } from '@builder.io/qwik';

import { css, cx } from '@/styled-system/css';
import { icon, iconButton } from '@/styled-system/recipes';

import { THEME_OPTION } from './config';
import type { ThemePreference } from './theme-script';

// ============================================================================
// SHARED STYLES
// ============================================================================

const demoContainerStyles = css({
	display: 'flex',
	flexDir: 'column',
	gap: '8',
	p: '8',
});

const demoRowStyles = css({
	display: 'flex',
	alignItems: 'center',
	gap: '4',
});

const labelStyles = css({
	minW: '220px',
	fontSize: 'sm',
	fontWeight: 'medium',
	color: 'fg.muted',
});

// Container that holds all stacked icons
const iconStackContainerStyles = css({
	pos: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

// Base styles for stacked icons
const stackedIconBaseStyles = css({
	pos: 'absolute',
	// Hidden by default
	opacity: 0,
	pointerEvents: 'none',
});

// ============================================================================
// OPTION 1: CROSSFADE (Opacity only)
// ============================================================================

const crossfadeActiveStyles = css({
	opacity: 1,
	transition: 'opacity 0.3s ease-in-out',
});

const crossfadeInactiveStyles = css({
	opacity: 0,
	transition: 'opacity 0.3s ease-in-out',
});

// ============================================================================
// OPTION 2: ROTATE + SCALE
// ============================================================================

const rotateScaleActiveStyles = css({
	opacity: 1,
	transform: 'rotate(0deg) scale(1)',
	transition:
		'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
});

const rotateScaleInactiveStyles = css({
	opacity: 0,
	transform: 'rotate(180deg) scale(0)',
	transition:
		'opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
});

// ============================================================================
// OPTION 3: SLIDE UP
// ============================================================================

const slideUpActiveStyles = css({
	opacity: 1,
	transform: 'translateY(0)',
	transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
});

const slideUpInactiveStyles = css({
	opacity: 0,
	transform: 'translateY(50%)',
	transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
});

// ============================================================================
// OPTION 4: SCALE BOUNCE
// ============================================================================

const scaleBounceActiveStyles = css({
	opacity: 1,
	transform: 'scale(1)',
	transition:
		'opacity 0.2s ease, transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
});

const scaleBounceInactiveStyles = css({
	opacity: 0,
	transform: 'scale(0)',
	transition:
		'opacity 0.2s ease, transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
});

// ============================================================================
// OPTION 5: FLIP 3D (Y-axis)
// ============================================================================

const flip3dContainerStyles = css({
	perspective: '200px',
});

const flip3dActiveStyles = css({
	opacity: 1,
	transform: 'rotateY(0deg)',
	transition: 'opacity 0.25s ease, transform 0.5s ease-in-out',
});

const flip3dInactiveStyles = css({
	opacity: 0,
	transform: 'rotateY(90deg)',
	transition: 'opacity 0.25s ease, transform 0.5s ease-in-out',
});

// ============================================================================
// OPTION 6: ROTATE 360
// ============================================================================

const rotate360ActiveStyles = css({
	opacity: 1,
	transform: 'rotate(0deg)',
	transition: 'opacity 0.25s ease, transform 0.5s ease-in-out',
});

const rotate360InactiveStyles = css({
	opacity: 0,
	transform: 'rotate(-180deg)',
	transition: 'opacity 0.25s ease, transform 0.5s ease-in-out',
});

// ============================================================================
// OPTION B: WRAPPER ANIMATION (Animate container, swap icon inside)
// ============================================================================

const wrapperPopContainerStyles = css({
	'& .icon-wrapper': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
	},
	'&:active .icon-wrapper': {
		transform: 'scale(0.85)',
	},
});

const wrapperPopAnimatingStyles = css({
	'& .icon-wrapper': {
		animation: 'wrapperPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
	},
});

// Variant B2: Flip wrapper
const wrapperFlipContainerStyles = css({
	perspective: '200px',
	'& .icon-wrapper': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transformStyle: 'preserve-3d',
		transition: 'transform 0.4s ease-in-out',
	},
});

const wrapperFlipAnimatingStyles = css({
	'& .icon-wrapper': {
		animation: 'wrapperFlip 0.5s ease-in-out',
	},
});

// ============================================================================
// OPTION C: REAL SVG ICONS (Inline SVG with morphing potential)
// ============================================================================

// SVG Icons as Qwik components
const SunSvgIcon = component$<{ class?: string }>(({ class: className }) => (
	<svg
		aria-hidden='true'
		class={className}
		fill='none'
		height='20'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		viewBox='0 0 24 24'
		width='20'
		xmlns='http://www.w3.org/2000/svg'
	>
		<title>Sun icon</title>
		<circle cx='12' cy='12' r='4' />
		<path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
	</svg>
));

const MoonSvgIcon = component$<{ class?: string }>(({ class: className }) => (
	<svg
		aria-hidden='true'
		class={className}
		fill='none'
		height='20'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		viewBox='0 0 24 24'
		width='20'
		xmlns='http://www.w3.org/2000/svg'
	>
		<title>Moon icon</title>
		<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z' />
	</svg>
));

const MonitorSvgIcon = component$<{ class?: string }>(
	({ class: className }) => (
		<svg
			aria-hidden='true'
			class={className}
			fill='none'
			height='20'
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			stroke-width='2'
			viewBox='0 0 24 24'
			width='20'
			xmlns='http://www.w3.org/2000/svg'
		>
			<title>Monitor icon</title>
			<rect height='14' rx='2' ry='2' width='20' x='2' y='3' />
			<line x1='8' x2='16' y1='21' y2='21' />
			<line x1='12' x2='12' y1='17' y2='21' />
		</svg>
	),
);

// SVG base styles
const svgIconBaseStyles = css({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	color: 'fg',
});

// SVG animation variants
const svgCrossfadeActiveStyles = css({
	opacity: 1,
	transition: 'opacity 0.3s ease-in-out',
});

const svgCrossfadeInactiveStyles = css({
	opacity: 0,
	transition: 'opacity 0.3s ease-in-out',
});

// SVG morphing/path animation styles
const svgMorphActiveStyles = css({
	opacity: 1,
	transform: 'translate(-50%, -50%) scale(1)',
	'& path, & circle, & rect, & line': {
		transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
	},
});

const svgMorphInactiveStyles = css({
	opacity: 0,
	transform: 'translate(-50%, -50%) scale(0.5)',
	'& path, & circle, & rect, & line': {
		transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
	},
});

// SVG stroke dash animation
const svgStrokeActiveStyles = css({
	opacity: 1,
	'& path, & circle, & rect, & line': {
		strokeDasharray: '100',
		strokeDashoffset: '0',
		transition: 'stroke-dashoffset 2s ease-out, opacity 1.2s ease',
	},
});

const svgStrokeInactiveStyles = css({
	opacity: 0,
	'& path, & circle, & rect, & line': {
		strokeDasharray: '100',
		strokeDashoffset: '100',
		transition: 'stroke-dashoffset 2s ease-out, opacity 1.2s ease',
	},
});

// ============================================================================
// ANIMATED ICON COMPONENT (Stacked approach)
// ============================================================================

interface AnimatedThemeIconProps {
	theme: ThemePreference;
	activeStyles: string;
	inactiveStyles: string;
	containerStyles?: string;
}

const AnimatedThemeIcon = component$<AnimatedThemeIconProps>(
	({ theme, activeStyles, inactiveStyles, containerStyles }) => {
		const iconClasses = icon({ mode: 'mask', size: 'lg' });
		const iconBtnClasses = iconButton({ size: 'md', variant: 'ghost' });
		const currentTheme = useSignal<ThemePreference>(theme);

		const cycleTheme$ = $(() => {
			const themes: ThemePreference[] = ['light', 'dark', 'system'];
			const currentIndex = themes.indexOf(currentTheme.value);
			currentTheme.value = themes[(currentIndex + 1) % themes.length];
		});

		return (
			<button
				class={cx(iconBtnClasses.root, containerStyles)}
				onClick$={cycleTheme$}
				type='button'
			>
				<span class={iconStackContainerStyles}>
					{THEME_OPTION.map(({ value, maskImageClass }) => (
						<i
							aria-hidden='true'
							class={cx(
								iconBtnClasses.icon,
								iconClasses,
								maskImageClass,
								stackedIconBaseStyles,
								currentTheme.value === value ? activeStyles : inactiveStyles,
							)}
							key={value}
						/>
					))}
				</span>
			</button>
		);
	},
);

// ============================================================================
// OPTION B: WRAPPER ANIMATION COMPONENT
// Icon stays the same, wrapper animates on theme change
// ============================================================================

const WrapperAnimatedThemeIcon = component$<{
	theme: ThemePreference;
	variant: 'pop' | 'flip';
}>(({ theme, variant }) => {
	const iconClasses = icon({ mode: 'mask', size: 'lg' });
	const iconBtnClasses = iconButton({ size: 'md', variant: 'ghost' });
	const currentTheme = useSignal<ThemePreference>(theme);
	const isAnimating = useSignal(false);

	const cycleTheme$ = $(() => {
		isAnimating.value = true;
		// Change icon at mid-animation (when wrapper is smallest/rotated)
		setTimeout(
			() => {
				const themes: ThemePreference[] = ['light', 'dark', 'system'];
				const currentIndex = themes.indexOf(currentTheme.value);
				currentTheme.value = themes[(currentIndex + 1) % themes.length];
			},
			variant === 'pop' ? 120 : 200,
		);
		// Reset animation flag
		setTimeout(
			() => {
				isAnimating.value = false;
			},
			variant === 'pop' ? 400 : 500,
		);
	});

	const currentIcon = THEME_OPTION.find(
		(opt) => opt.value === currentTheme.value,
	);

	const containerClass =
		variant === 'pop' ? wrapperPopContainerStyles : wrapperFlipContainerStyles;
	const animatingClass =
		variant === 'pop' ? wrapperPopAnimatingStyles : wrapperFlipAnimatingStyles;

	return (
		<button
			class={cx(
				iconBtnClasses.root,
				containerClass,
				isAnimating.value && animatingClass,
			)}
			onClick$={cycleTheme$}
			type='button'
		>
			<span class='icon-wrapper'>
				<i
					aria-hidden='true'
					class={cx(
						iconBtnClasses.icon,
						iconClasses,
						currentIcon?.maskImageClass,
					)}
				/>
			</span>
		</button>
	);
});

// ============================================================================
// OPTION C: REAL SVG ANIMATION COMPONENT
// Inline SVG with stacking + animations
// ============================================================================

const SvgAnimatedThemeIcon = component$<{
	theme: ThemePreference;
	variant: 'crossfade' | 'morph' | 'stroke';
}>(({ theme, variant }) => {
	const iconBtnClasses = iconButton({ size: 'md', variant: 'ghost' });
	const currentTheme = useSignal<ThemePreference>(theme);

	const cycleTheme$ = $(() => {
		const themes: ThemePreference[] = ['light', 'dark', 'system'];
		const currentIndex = themes.indexOf(currentTheme.value);
		currentTheme.value = themes[(currentIndex + 1) % themes.length];
	});

	const getActiveClass = () => {
		switch (variant) {
			case 'morph':
				return svgMorphActiveStyles;
			case 'stroke':
				return svgStrokeActiveStyles;
			default:
				return svgCrossfadeActiveStyles;
		}
	};

	const getInactiveClass = () => {
		switch (variant) {
			case 'morph':
				return svgMorphInactiveStyles;
			case 'stroke':
				return svgStrokeInactiveStyles;
			default:
				return svgCrossfadeInactiveStyles;
		}
	};

	return (
		<button class={iconBtnClasses.root} onClick$={cycleTheme$} type='button'>
			<span class={iconStackContainerStyles}>
				<SunSvgIcon
					class={cx(
						svgIconBaseStyles,
						currentTheme.value === 'light'
							? getActiveClass()
							: getInactiveClass(),
					)}
				/>
				<MoonSvgIcon
					class={cx(
						svgIconBaseStyles,
						currentTheme.value === 'dark'
							? getActiveClass()
							: getInactiveClass(),
					)}
				/>
				<MonitorSvgIcon
					class={cx(
						svgIconBaseStyles,
						currentTheme.value === 'system'
							? getActiveClass()
							: getInactiveClass(),
					)}
				/>
			</span>
		</button>
	);
});

// ============================================================================
// DEMO PAGE COMPONENT
// ============================================================================

export const ThemeIconDemo = component$(() => {
	return (
		<div class={demoContainerStyles}>
			<h2 class={css({ fontSize: '2xl', fontWeight: 'bold', mb: '4' })}>
				Theme Icon Animation Options (Fixed)
			</h2>
			<p class={css({ color: 'fg.muted', mb: '2' })}>
				Click each icon to cycle through: Light → Dark → System → Light...
			</p>
			<p class={css({ color: 'fg.subtle', fontSize: 'sm', mb: '6' })}>
				✅ All 3 icons are rendered and stacked. Animation works by toggling
				opacity/transform.
			</p>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 1: Crossfade (Opacity)</span>
				<AnimatedThemeIcon
					activeStyles={crossfadeActiveStyles}
					inactiveStyles={crossfadeInactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Simple, subtle, professional
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 2: Rotate + Scale</span>
				<AnimatedThemeIcon
					activeStyles={rotateScaleActiveStyles}
					inactiveStyles={rotateScaleInactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Engaging, "switching" feel
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 3: Slide Up</span>
				<AnimatedThemeIcon
					activeStyles={slideUpActiveStyles}
					inactiveStyles={slideUpInactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Like cycling through options
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 4: Scale Bounce</span>
				<AnimatedThemeIcon
					activeStyles={scaleBounceActiveStyles}
					inactiveStyles={scaleBounceInactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Playful, satisfying bounce
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 5: Flip 3D (Y-axis)</span>
				<AnimatedThemeIcon
					activeStyles={flip3dActiveStyles}
					containerStyles={flip3dContainerStyles}
					inactiveStyles={flip3dInactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Card flip effect, unique
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>Option 6: Rotate 180 + Fade</span>
				<AnimatedThemeIcon
					activeStyles={rotate360ActiveStyles}
					inactiveStyles={rotate360InactiveStyles}
					theme='light'
				/>
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Half spin, elegant
				</span>
			</div>

			<hr class={css({ my: '6', borderColor: 'border' })} />

			{/* ============== OPTION B: WRAPPER ANIMATION ============== */}
			<h3 class={css({ fontSize: 'lg', fontWeight: 'semibold', mb: '2' })}>
				🔄 Option B: Wrapper Animation
			</h3>
			<p class={css({ color: 'fg.muted', fontSize: 'sm', mb: '4' })}>
				Only 1 icon is rendered at a time. The wrapper container animates, and
				icon swaps at the midpoint of animation.
			</p>

			<div class={demoRowStyles}>
				<span class={labelStyles}>B1: Pop Animation</span>
				<WrapperAnimatedThemeIcon theme='light' variant='pop' />
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Shrink → Swap → Bounce back
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>B2: Flip Animation</span>
				<WrapperAnimatedThemeIcon theme='light' variant='flip' />
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					3D flip with icon swap at 90°
				</span>
			</div>

			<hr class={css({ my: '6', borderColor: 'border' })} />

			{/* ============== OPTION C: REAL SVG ============== */}
			<h3 class={css({ fontSize: 'lg', fontWeight: 'semibold', mb: '2' })}>
				✨ Option C: Real SVG Icons
			</h3>
			<p class={css({ color: 'fg.muted', fontSize: 'sm', mb: '4' })}>
				Inline SVG components instead of mask-image. Enables path animations,
				stroke drawing effects, and future SVG morphing.
			</p>

			<div class={demoRowStyles}>
				<span class={labelStyles}>C1: SVG Crossfade</span>
				<SvgAnimatedThemeIcon theme='light' variant='crossfade' />
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Simple opacity transition
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>C2: SVG Scale Morph</span>
				<SvgAnimatedThemeIcon theme='light' variant='morph' />
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Scale + fade for "morphing" feel
				</span>
			</div>

			<div class={demoRowStyles}>
				<span class={labelStyles}>C3: SVG Stroke Draw</span>
				<SvgAnimatedThemeIcon theme='light' variant='stroke' />
				<span class={css({ fontSize: 'xs', color: 'fg.subtle' })}>
					Line drawing effect (requires tuning)
				</span>
			</div>

			<hr class={css({ my: '6', borderColor: 'border' })} />

			<h3 class={css({ fontSize: 'lg', fontWeight: 'semibold', mb: '2' })}>
				🔧 How each approach works
			</h3>

			<div class={css({ mb: '4' })}>
				<h4 class={css({ fontWeight: 'semibold', color: 'fg', mb: '1' })}>
					Option A: Stacked Icons (mask-image)
				</h4>
				<ul
					class={css({
						listStyleType: 'disc',
						pl: '6',
						color: 'fg.muted',
						fontSize: 'sm',
						'& li': { mb: '1' },
					})}
				>
					<li>All 3 icons are rendered and stacked with position: absolute</li>
					<li>Active icon has opacity: 1, inactive icons have opacity: 0</li>
					<li>CSS transitions animate between states smoothly</li>
					<li>
						Uses mask-image for icon display (doesn't change during transition)
					</li>
				</ul>
			</div>

			<div class={css({ mb: '4' })}>
				<h4 class={css({ fontWeight: 'semibold', color: 'fg', mb: '1' })}>
					Option B: Wrapper Animation
				</h4>
				<ul
					class={css({
						listStyleType: 'disc',
						pl: '6',
						color: 'fg.muted',
						fontSize: 'sm',
						'& li': { mb: '1' },
					})}
				>
					<li>Only 1 icon is rendered at a time (lighter DOM)</li>
					<li>Wrapper container animates with CSS keyframes</li>
					<li>Icon swaps instantly at the midpoint of animation</li>
					<li>
						Good for "magical" transitions where icon just appears different
					</li>
				</ul>
			</div>

			<div class={css({ mb: '4' })}>
				<h4 class={css({ fontWeight: 'semibold', color: 'fg', mb: '1' })}>
					Option C: Real SVG
				</h4>
				<ul
					class={css({
						listStyleType: 'disc',
						pl: '6',
						color: 'fg.muted',
						fontSize: 'sm',
						'& li': { mb: '1' },
					})}
				>
					<li>Inline SVG components instead of mask-image</li>
					<li>Can animate individual SVG paths and strokes</li>
					<li>Future potential: SVG morphing between icon shapes</li>
					<li>Most flexible but requires more code</li>
				</ul>
			</div>

			<h3
				class={css({
					fontSize: 'lg',
					fontWeight: 'semibold',
					mb: '2',
					mt: '4',
				})}
			>
				💡 Recommendation
			</h3>
			<ul
				class={css({
					listStyleType: 'disc',
					pl: '6',
					color: 'fg.muted',
					'& li': { mb: '2' },
				})}
			>
				<li>
					<strong>🏆 Option A - Option 2 (Rotate + Scale)</strong> - Best
					balance of engaging and professional. Easy to implement.
				</li>
				<li>
					<strong>Option A - Option 4 (Scale Bounce)</strong> - More playful,
					good for creative sites
				</li>
				<li>
					<strong>Option B - Pop/Flip</strong> - Good if you want simpler DOM (1
					icon) with "magic" swap effect
				</li>
				<li>
					<strong>Option C - Real SVG</strong> - Best for future advanced
					animations, but more complex to maintain
				</li>
			</ul>
		</div>
	);
});

// Export animation styles for use in ThemeSelector
export const themeIconAnimations = {
	// Option A: Stacked icons with various animations
	crossfade: {
		active: crossfadeActiveStyles,
		inactive: crossfadeInactiveStyles,
	},
	rotateScale: {
		active: rotateScaleActiveStyles,
		inactive: rotateScaleInactiveStyles,
	},
	slideUp: {
		active: slideUpActiveStyles,
		inactive: slideUpInactiveStyles,
	},
	scaleBounce: {
		active: scaleBounceActiveStyles,
		inactive: scaleBounceInactiveStyles,
	},
	flip3d: {
		active: flip3dActiveStyles,
		inactive: flip3dInactiveStyles,
		container: flip3dContainerStyles,
	},
	rotate360: {
		active: rotate360ActiveStyles,
		inactive: rotate360InactiveStyles,
	},
};

// Option B: Wrapper animation styles
export const wrapperAnimations = {
	pop: {
		container: wrapperPopContainerStyles,
		animating: wrapperPopAnimatingStyles,
	},
	flip: {
		container: wrapperFlipContainerStyles,
		animating: wrapperFlipAnimatingStyles,
	},
};

// Option C: Real SVG animation styles
export const svgAnimations = {
	crossfade: {
		active: svgCrossfadeActiveStyles,
		inactive: svgCrossfadeInactiveStyles,
	},
	morph: {
		active: svgMorphActiveStyles,
		inactive: svgMorphInactiveStyles,
	},
	stroke: {
		active: svgStrokeActiveStyles,
		inactive: svgStrokeInactiveStyles,
	},
	base: svgIconBaseStyles,
};

// Export SVG components for Option C
export { SunSvgIcon, MoonSvgIcon, MonitorSvgIcon };

// Export shared styles
export { iconStackContainerStyles, stackedIconBaseStyles };
