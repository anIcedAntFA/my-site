/**
 * Theme Script - Prevents FOUC (Flash of Unstyled Content)
 *
 * This script runs IMMEDIATELY before any rendering to set the correct theme.
 * It must be inlined in <head> as a blocking script.
 *
 * Flow:
 * 1. Check localStorage for saved preference
 * 2. If 'light' or 'dark' → apply directly
 * 3. If 'system' or none → detect system preference via matchMedia
 * 4. Set data-theme attribute on <html>
 */

export const THEME_STORAGE_KEY = 'theme-preference';
export const THEME_PREFERENCE_ATTR = 'data-theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

/**
 * Inline script to be injected in <head>
 * This prevents flash of wrong theme on page load
 *
 * Sets two attributes on <html>:
 * - data-theme: effective theme (light/dark) for CSS
 * - data-theme-preference: user preference (light/dark/system) for JS
 */
export const themeScript = `
(function() {
  try {
    var STORAGE_KEY = '${THEME_STORAGE_KEY}';
    var preference = localStorage.getItem(STORAGE_KEY) || 'system';
    var el = document.documentElement;

    // Store the preference for JS to read
    el.setAttribute('data-theme-preference', preference);

    if (preference === 'light' || preference === 'dark') {
      el.setAttribute('data-theme', preference);
      el.classList.remove('light', 'dark');
      el.classList.add(preference);
    } else {
      // System preference
      var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = isDark ? 'dark' : 'light';
      el.setAttribute('data-theme', theme);
      el.classList.remove('light', 'dark');
      el.classList.add(theme);
    }
  } catch (e) {
    // Fallback to light theme if localStorage is not available
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-theme-preference', 'system');
    document.documentElement.classList.add('light');
  }
})();
`;
