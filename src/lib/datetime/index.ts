/**
 * DateTime utilities for consistent date formatting across the app
 *
 * @example
 * ```ts
 * import { formatLastModified, formatPublishedDate, formatDate } from '@/lib/datetime';
 *
 * // Blog post dates
 * const lastMod = formatLastModified(remarkPluginFrontmatter.lastModified);
 * const pubDate = formatPublishedDate(post.data.publishedDate);
 *
 * // Custom format
 * const custom = formatDate(date, 'DD/MM/YY');
 *
 * // With time element support
 * const { display, iso } = formatDateFull(date, 'long');
 * // <time datetime={iso}>{display}</time>
 * ```
 */

// Constants for custom formatting
export {
	DATE_ISO,
	DATE_LONG,
	DATE_MEDIUM,
	DATE_SHORT,
	DATETIME_FULL_UTC,
	RELATIVE_THRESHOLDS,
	TIME_FULL,
	TIME_SHORT,
} from './constants';
// Core formatting functions
export {
	formatDate,
	formatDateFull,
	formatLastModified,
	formatPublishedDate,
	toISOString,
} from './format';
// Types
export type {
	DateFormatPreset,
	DateInput,
	FormatDateOptions,
	FormattedDateResult,
} from './types';
