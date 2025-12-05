import {
	$,
	isServer,
	type Signal,
	useOnDocument,
	useVisibleTask$,
} from '@builder.io/qwik';

import {
	type EffectiveTheme,
	THEME_STORAGE_KEY,
	type ThemePreference,
} from './theme-script';

export interface UseThemeReturn {
	/** Apply a new theme preference */
	setTheme: (theme: ThemePreference) => void;
	/** Initialize theme and set up system preference listener */
	initTheme: () => void;
}

/**
 * Custom hook for theme management in Qwik components
 *
 * @param selectedTheme - Signal to track the current theme preference
 * @returns Object with setTheme and initTheme functions
 *
 * Features:
 * - Reads from localStorage on mount
 * - Listens to system preference changes for 'system' mode
 * - Updates DOM (data-theme attribute + class) immediately
 * - Persists preference to localStorage
 */
export const useTheme = (
	selectedTheme: Signal<ThemePreference>,
): UseThemeReturn => {
	/**
	 * Get the effective theme (light/dark) based on system preference
	 */
	const getSystemTheme = $((): EffectiveTheme => {
		if (isServer) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	});

	/**
	 * Apply theme to DOM
	 * Updates both data-theme attribute and class on <html>
	 */
	const applyTheme = $((effectiveTheme: EffectiveTheme) => {
		// Guard: only run in browser environment
		if (isServer) return;
		const html = document.documentElement;
		html.setAttribute('data-theme', effectiveTheme);
		html.classList.remove('light', 'dark');
		html.classList.add(effectiveTheme);
	});

	/**
	 * Set and persist theme preference
	 * If 'system', resolves to actual light/dark based on system preference
	 */
	const setTheme = $(async (preference: ThemePreference) => {
		// Guard: only run in browser environment
		if (isServer) {
			selectedTheme.value = preference;
			return;
		}

		try {
			localStorage.setItem(THEME_STORAGE_KEY, preference);
		} catch {
			// localStorage may not be available in some environments
		}

		selectedTheme.value = preference;

		if (preference === 'system') {
			const systemTheme = await getSystemTheme();
			await applyTheme(systemTheme);
		} else {
			await applyTheme(preference);
		}
	});

	/**
	 * Read stored preference and initialize signal
	 */
	const initTheme = $(async () => {
		// Guard: only run in browser environment
		if (isServer) return;

		try {
			const stored = localStorage.getItem(
				THEME_STORAGE_KEY,
			) as ThemePreference | null;

			if (stored === 'light' || stored === 'dark' || stored === 'system') {
				selectedTheme.value = stored;

				if (stored === 'system') {
					const systemTheme = await getSystemTheme();
					await applyTheme(systemTheme);
				} else {
					await applyTheme(stored);
				}
			} else {
				// No preference stored, default to system
				selectedTheme.value = 'system';
				const systemTheme = await getSystemTheme();
				await applyTheme(systemTheme);
			}
		} catch {
			// Fallback
			selectedTheme.value = 'system';
		}
	});

	/**
	 * Initialize theme on component mount
	 * eagerness: 'load' ensures this runs as soon as possible
	 *
	 * Note: useVisibleTask$ is intentionally used here because theme initialization
	 * requires client-side DOM access for localStorage and matchMedia APIs.
	 */
	// biome-ignore lint/correctness/noQwikUseVisibleTask: Theme init requires client-side localStorage/matchMedia
	useVisibleTask$(
		async () => {
			await initTheme();
		},
		{ strategy: 'document-ready' },
	);

	/**
	 * Listen for system preference changes
	 * Only applies when user has selected 'system' theme
	 */
	useOnDocument(
		'visibilitychange',
		$(async () => {
			// Guard: only run in browser environment
			if (isServer) return;

			// Re-check system preference when tab becomes visible
			if (
				document.visibilityState === 'visible' &&
				selectedTheme.value === 'system'
			) {
				const systemTheme = await getSystemTheme();
				await applyTheme(systemTheme);
			}
		}),
	);

	/**
	 * Set up matchMedia listener for real-time system theme changes
	 *
	 * Note: useVisibleTask$ is intentionally used here because matchMedia listener
	 * requires client-side Window API access and needs cleanup on unmount.
	 */
	// biome-ignore lint/correctness/noQwikUseVisibleTask: matchMedia requires client-side Window API
	useVisibleTask$(
		async ({ cleanup }) => {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			const handleChange = async (event: MediaQueryListEvent) => {
				if (selectedTheme.value === 'system') {
					await applyTheme(event.matches ? 'dark' : 'light');
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			cleanup(() => {
				mediaQuery.removeEventListener('change', handleChange);
			});
		},
		{ strategy: 'document-ready' },
	);

	return {
		setTheme,
		initTheme,
	};
};

export const isThemePreference = (value: unknown): value is ThemePreference => {
	return value === 'light' || value === 'dark' || value === 'system';
};
