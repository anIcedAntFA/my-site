import { $, useOnWindow, useSignal, useStore } from '@builder.io/qwik';

const THROTTLE_TIME = 50;
const VISIBILITY_THRESHOLD = 200;

/**
 * A custom hook that tracks scroll progress and visibility state for a scroll progress bar.
 *
 * @param throttleTime - The minimum time in milliseconds between progress calculations (defaults to THROTTLE_TIME)
 * @param visibilityThreshold - The scroll position in pixels after which the progress bar becomes visible (defaults to VISIBILITY_THRESHOLD)
 * @returns An object containing:
 *   - `progress`: A signal representing the scroll progress as a percentage (0-100)
 *   - `isVisible`: A signal indicating whether the progress bar should be visible
 *
 * @example
 * ```typescript
 * const { progress, isVisible } = useScrollProgressBar(100, 300);
 *
 * // Use in component
 * <div style={{ opacity: isVisible.value ? 1 : 0 }}>
 *   <div style={{ width: `${progress.value}%` }} />
 * </div>
 * ```
 *
 * @remarks
 * - The hook automatically listens to scroll and resize events
 * - Progress calculation is throttled to improve performance
 * - The progress bar becomes visible after scrolling past the visibility threshold
 * - Progress is calculated based on the total scrollable height of the document
 */
export const useScrollProgressBar = (
	throttleTime = THROTTLE_TIME,
	visibilityThreshold = VISIBILITY_THRESHOLD,
) => {
	const progress = useSignal(0);
	const isVisible = useSignal(false);

	const state = useStore({
		documentHeight: 0,
		windowHeight: 0,
		lastRun: 0,
	});

	const measureSize$ = $(() => {
		state.documentHeight = document.documentElement.scrollHeight;
		state.windowHeight = window.innerHeight;
	});

	const calculateProgress$ = $(async () => {
		// Throttle the execution to improve performance
		const now = performance.now();
		if (now - state.lastRun < throttleTime) return;
		state.lastRun = now;

		if (state.documentHeight === 0) {
			measureSize$();
		}

		const scrollableHeight = state.documentHeight - state.windowHeight;
		if (scrollableHeight <= 0) return;

		const scrolled = window.scrollY;
		progress.value = Math.min((scrolled / scrollableHeight) * 100, 100);
		isVisible.value = scrolled > visibilityThreshold;
	});

	useOnWindow('scroll', calculateProgress$);
	useOnWindow('resize', measureSize$);

	return { progress, isVisible };
};
