import {
	$,
	isServer,
	type Signal,
	useOnDocument,
	useVisibleTask$,
} from '@builder.io/qwik';

import {
	type EffectiveTheme,
	THEME_PREFERENCE_ATTR,
	THEME_STORAGE_KEY,
	type ThemePreference,
} from './theme-script';

export interface UseThemeReturn {
	/** Apply a new theme preference */
	setTheme: (theme: ThemePreference) => void;
}

/**
 * Type guard function that checks if a given value is a valid ThemePreference.
 * @param value - The value to check.
 * @returns `true` if the value is 'light', 'dark', or 'system', otherwise `false`.
 */
export const isThemePreference = (value: unknown): value is ThemePreference => {
	return value === 'light' || value === 'dark' || value === 'system';
};

/**
 * Get the initial theme preference from DOM attribute or localStorage
 * This runs synchronously to avoid flash of wrong icon
 *
 * Priority:
 * 1. data-theme-preference attribute (set by inline script)
 * 2. localStorage
 * 3. Default to 'system'
 */
export const getInitialTheme = (): ThemePreference => {
	if (isServer) return 'system';

	try {
		// First, try to read from DOM attribute (fastest, already set by inline script)
		const attrValue = document.documentElement.getAttribute(
			THEME_PREFERENCE_ATTR,
		);
		if (isThemePreference(attrValue)) {
			return attrValue;
		}

		// Fallback to localStorage
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (isThemePreference(stored)) {
			return stored;
		}
	} catch {
		// localStorage may not be available
	}

	return 'system';
};

/**
 * Custom hook for theme management in Qwik components
 *
 * @param selectedTheme - Signal to track the current theme preference
 * @returns Object with setTheme function
 *
 * Features:
 * - Signal is initialized with correct value from getInitialTheme()
 * - Listens to system preference changes for 'system' mode
 * - Updates DOM (data-theme + data-theme-preference attributes, classes)
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
	 * Updates data-theme attribute, classes, and data-theme-preference
	 */
	const applyTheme = $(
		(effectiveTheme: EffectiveTheme, preference: ThemePreference) => {
			if (isServer) return;

			const html = document.documentElement;
			// Update effective theme for CSS
			html.setAttribute('data-theme', effectiveTheme);
			html.classList.remove('light', 'dark');
			html.classList.add(effectiveTheme);
			// Update preference for JS
			html.setAttribute(THEME_PREFERENCE_ATTR, preference);
		},
	);

	/**
	 * Set and persist theme preference
	 * If 'system', resolves to actual light/dark based on system preference
	 */
	const setTheme = $(async (preference: ThemePreference) => {
		if (isServer) {
			selectedTheme.value = preference;
			return;
		}

		// Persist to localStorage
		try {
			localStorage.setItem(THEME_STORAGE_KEY, preference);
		} catch {
			// localStorage may not be available in some environments
		}

		// Update signal
		selectedTheme.value = preference;

		// Apply to DOM
		const effectiveTheme =
			preference === 'system' ? await getSystemTheme() : preference;
		await applyTheme(effectiveTheme, preference);
	});

	/**
	 * Listen for system preference changes when tab becomes visible
	 * Re-applies theme in case system preference changed while tab was hidden
	 */
	useOnDocument(
		'visibilitychange',
		$(async () => {
			if (isServer) return;

			if (
				document.visibilityState === 'visible' &&
				selectedTheme.value === 'system'
			) {
				const systemTheme = await getSystemTheme();
				await applyTheme(systemTheme, 'system');
			}
		}),
	);

	/**
	 * Set up matchMedia listener for real-time system theme changes
	 */
	useVisibleTask$(
		({ cleanup }) => {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			const handleChange = async (event: MediaQueryListEvent) => {
				if (selectedTheme.value === 'system') {
					await applyTheme(event.matches ? 'dark' : 'light', 'system');
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			cleanup(() => {
				mediaQuery.removeEventListener('change', handleChange);
			});
		},
		{ strategy: 'document-idle' },
	);

	return { setTheme };
};
