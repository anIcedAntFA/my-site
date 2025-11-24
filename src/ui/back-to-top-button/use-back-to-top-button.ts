import { $, useOnWindow, useSignal, useStore } from '@builder.io/qwik';

const SCROLL_THRESHOLD = 400;
const SMOOTH_SCROLL = true;

/**
 * Hook for back-to-top button with scroll progress tracking
 * @param scrollThreshold - Scroll position (px) threshold to show button (default: 400)
 * @param isSmooth - Enable smooth scroll behavior (default: true)
 * @returns Object containing visibility state, button ref, and scroll handler
 */
export const useBackToTopButton = (
	scrollThreshold = SCROLL_THRESHOLD,
	isSmooth = SMOOTH_SCROLL,
) => {
	// Reactive signal to control button visibility
	const isVisible = useSignal(false);

	// Reference to button element for direct DOM manipulation
	const btnRef = useSignal<HTMLButtonElement>();

	// Store for document/window dimensions (used for scroll percentage calculation)
	const layout = useStore({
		docHeight: 0, // Total scrollable document height
		winHeight: 0, // Viewport height
	});

	/**
	 * Scrolls page to top with configurable behavior
	 */
	const scrollToTop$ = $(() => {
		window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' });
	});

	/**
	 * Measures and caches document/window dimensions
	 */
	const measure$ = $(() => {
		layout.docHeight = document.documentElement.scrollHeight;
		layout.winHeight = window.innerHeight;
	});

	/**
	 * Handles scroll events:
	 * - Toggles button visibility based on scroll position
	 * - Updates CSS custom property with scroll progress percentage
	 */
	const handleScroll$ = $(() => {
		// Lazy measure on first scroll
		if (layout.docHeight === 0) measure$();

		const scrollY = window.scrollY;
		const shouldShow = scrollY > scrollThreshold;

		// Update visibility only when state changes
		if (isVisible.value !== shouldShow) {
			isVisible.value = shouldShow;
		}

		// Update scroll progress indicator
		if (shouldShow && btnRef.value) {
			const { docHeight, winHeight } = layout;
			const totalScroll = docHeight - winHeight;

			// Calculate scroll percentage (0-100%)
			const percent =
				totalScroll > 0 ? Math.min((scrollY / totalScroll) * 100, 100) : 0;

			// Set CSS variable for visual progress ring/bar
			btnRef.value.style.setProperty('--btt-scroll-percent', `${percent}%`);
		}
	});

	useOnWindow('scroll', handleScroll$);
	useOnWindow('resize', measure$);

	return { isVisible, btnRef, scrollToTop$ };
};
