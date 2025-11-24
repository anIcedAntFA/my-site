import { component$ } from '@builder.io/qwik';

import { css } from '@/styled-system/css';

import { useScrollProgressBar } from './use-scroll-progress-bar';

export const ScrollProgressBar = component$(() => {
	const { progress, isVisible } = useScrollProgressBar();

	return (
		<div
			aria-hidden='true'
			class={css({
				position: 'fixed',
				top: '0',
				left: '0',
				right: '0',
				h: '1',
				zIndex: 'banner',
				pointerEvents: 'none',
				opacity: isVisible.value ? '1' : '0',
				transitionProperty: 'opacity',
				transitionDuration: 'slow',
				bg: 'white/10', // Subtle background track
			})}
		>
			<div
				class={css({
					h: '100%',
					bg: 'accent.gradient',
					transformOrigin: 'left',
					transitionProperty: 'transform',
					transitionDuration: 'faster',
					transitionTimingFunction: 'linear',
					willChange: 'transform', // Hint browser for optimization
				})}
				style={{
					// Use transform instead of width for better performance
					// Transform is hardware-accelerated and doesn't trigger layout reflow
					transform: `scaleX(${progress.value / 100})`,
				}}
			/>
		</div>
	);
});
