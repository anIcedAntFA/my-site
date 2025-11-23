import { $, component$, useSignal } from '@builder.io/qwik';

import { css } from '@/styled-system/css';

export const ScrollProgressBar = component$(() => {
	const scrollProgress = useSignal(0);
	const isVisible = useSignal(false);

	const calculateProgress$ = $(() => {
		// Get total scrollable height (entire document minus viewport)
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollableHeight = documentHeight - windowHeight;

		// Get current scroll position
		const scrolled = window.scrollY;

		// Calculate progress as percentage (0-100)
		const progress = (scrolled / scrollableHeight) * 100;

		// Update progress signal (capped at 100%)
		scrollProgress.value = Math.min(progress, 100);

		// Show bar only after scrolling past first viewport
		isVisible.value = scrolled > windowHeight * 0.2; // 20% of viewport
	});

	return (
		<div
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
			window:onScroll$={calculateProgress$}
		>
			<div
				class={css({
					h: '100%',
					bg: 'accent.gradient',
					transformOrigin: 'left',
					transitionProperty: 'transform',
					transitionDuration: 'fast',
					transitionTimingFunction: 'ease-in-smooth',
					willChange: 'transform', // Hint browser for optimization
				})}
				style={{
					// Use transform instead of width for better performance
					// Transform is hardware-accelerated and doesn't trigger layout reflow
					transform: `scaleX(${scrollProgress.value / 100})`,
				}}
			/>
		</div>
	);
});
