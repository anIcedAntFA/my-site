/**
 * Date formatting utilities using dayjs
 *
 * All functions are pure and return consistent results
 * Default timezone is UTC for consistency across server/client
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
	DATE_ISO,
	DATE_LONG,
	DATE_MEDIUM,
	DATE_SHORT,
	DATETIME_FULL_UTC,
} from './constants';
import type {
	DateFormatPreset,
	DateInput,
	FormatDateOptions,
	FormattedDateResult,
} from './types';

// Extend dayjs with UTC plugin
dayjs.extend(utc);

/** Map preset names to format patterns */
const FORMAT_PRESETS: Record<DateFormatPreset, string> = {
	'full-utc': DATETIME_FULL_UTC,
	long: DATE_LONG,
	medium: DATE_MEDIUM,
	short: DATE_SHORT,
	iso: DATE_ISO,
};

/**
 * Format a date using a preset or custom format pattern
 *
 * @param date - Date input (Date, string, number, or null/undefined)
 * @param format - Preset name or custom dayjs format string
 * @param options - Additional formatting options
 * @returns Formatted date string or fallback
 *
 * @example
 * ```ts
 * formatDate('2025-11-25', 'long')           // "25 November 2025"
 * formatDate('2025-11-25', 'full-utc')       // "00:00:00 25 November 2025 UTC"
 * formatDate('2025-11-25', 'DD/MM/YY')       // "25/11/25" (custom format)
 * formatDate(null, 'long', { fallback: '-' }) // "-"
 * ```
 */
export const formatDate = (
	date: DateInput,
	format: DateFormatPreset | string = 'long',
	options: FormatDateOptions = {},
): string => {
	const { utc: useUtc = true, fallback = '' } = options;

	if (date === null || date === undefined) {
		return fallback;
	}

	const parsed = useUtc ? dayjs(date).utc() : dayjs(date);

	if (!parsed.isValid()) {
		return fallback;
	}

	// Check if format is a preset name or custom pattern
	const pattern =
		format in FORMAT_PRESETS
			? FORMAT_PRESETS[format as DateFormatPreset]
			: format;

	return parsed.format(pattern);
};

/**
 * Format a date with both display and machine-readable values
 * Useful for <time> elements with datetime attribute
 *
 * @param date - Date input
 * @param format - Preset name or custom format for display
 * @param options - Additional formatting options
 * @returns Object with display, iso, and date properties
 *
 * @example
 * ```ts
 * const { display, iso } = formatDateFull('2025-11-25', 'long');
 * // display: "25 November 2025"
 * // iso: "2025-11-25T00:00:00.000Z"
 *
 * // In Astro:
 * <time datetime={iso}>{display}</time>
 * ```
 */
export const formatDateFull = (
	date: DateInput,
	format: DateFormatPreset | string = 'long',
	options: FormatDateOptions = {},
): FormattedDateResult => {
	const { utc: useUtc = true, fallback = '' } = options;

	if (date === null || date === undefined) {
		return { display: fallback, iso: '', date: null };
	}

	const parsed = useUtc ? dayjs(date).utc() : dayjs(date);

	if (!parsed.isValid()) {
		return { display: fallback, iso: '', date: null };
	}

	const pattern =
		format in FORMAT_PRESETS
			? FORMAT_PRESETS[format as DateFormatPreset]
			: format;

	return {
		display: parsed.format(pattern),
		iso: parsed.toISOString(),
		date: parsed.toDate(),
	};
};

/**
 * Format last modified date for blog posts
 * Uses full UTC format by default
 *
 * @param date - Last modified date from git/frontmatter
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatLastModified('2025-11-25T14:30:00Z')
 * // "14:30:00 25 November 2025 UTC"
 * ```
 */
export const formatLastModified = (date: DateInput): string =>
	formatDate(date, DATE_LONG, { fallback: 'Unknown' });

/**
 * Format published date for blog posts
 * Uses long format by default
 *
 * @param date - Published date from frontmatter
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatPublishedDate('2025-11-25')
 * // "25 November 2025"
 * ```
 */
export const formatPublishedDate = (date: DateInput): string =>
	formatDate(date, 'long', { fallback: 'Unknown' });

/**
 * Get ISO string for datetime attribute
 * Safe wrapper that handles invalid dates
 *
 * @param date - Date input
 * @returns ISO string or empty string if invalid
 */
export const toISOString = (date: DateInput): string => {
	if (date === null || date === undefined) {
		return '';
	}

	const parsed = dayjs(date).utc();
	return parsed.isValid() ? parsed.toISOString() : '';
};
