/**
 * Date/Time format patterns for consistent formatting across the app
 *
 * @see https://day.js.org/docs/en/display/format
 */

/** Full datetime with timezone - "14:30:00 25 November 2025 UTC" */
export const DATETIME_FULL_UTC = 'HH:mm:ss DD MMMM YYYY [UTC]';

/** Date with month name - "25 November 2025" */
export const DATE_LONG = 'DD MMMM YYYY';

/** Date with short month - "25 Nov 2025" */
export const DATE_MEDIUM = 'DD MMM YYYY';

/** ISO date - "2025-11-25" */
export const DATE_ISO = 'YYYY-MM-DD';

/** Short date - "25/11/2025" */
export const DATE_SHORT = 'DD/MM/YYYY';

/** Time only - "14:30" */
export const TIME_SHORT = 'HH:mm';

/** Time with seconds - "14:30:00" */
export const TIME_FULL = 'HH:mm:ss';

/** Relative formats for human-readable display */
export const RELATIVE_THRESHOLDS = {
	/** Show "just now" for dates within this many seconds */
	JUST_NOW: 60,
	/** Show relative time (e.g., "2 hours ago") within this many hours */
	HOURS: 24,
	/** Show relative time (e.g., "3 days ago") within this many days */
	DAYS: 7,
} as const;
