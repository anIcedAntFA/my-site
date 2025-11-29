/**
 * Types for datetime utilities
 */

/** Acceptable date input types */
export type DateInput = Date | string | number | null | undefined;

/** Preset format names for common use cases */
export type DateFormatPreset =
	| 'full-utc' // "14:30:00 25 November 2025 UTC"
	| 'long' // "25 November 2025"
	| 'medium' // "25 Nov 2025"
	| 'short' // "25/11/2025"
	| 'iso'; // "2025-11-25"

/** Options for formatting dates */
export interface FormatDateOptions {
	/** Use UTC timezone (default: true for consistency) */
	utc?: boolean;
	/** Fallback text when date is invalid */
	fallback?: string;
}

/** Formatted date result with both display and machine-readable values */
export interface FormattedDateResult {
	/** Human-readable formatted date */
	display: string;
	/** ISO 8601 format for datetime attribute */
	iso: string;
	/** Original date as Date object (or null if invalid) */
	date: Date | null;
}
