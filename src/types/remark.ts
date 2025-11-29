/**
 * Type definitions for remark plugin frontmatter
 *
 * These types represent the data injected by remark plugins
 * during the Astro content processing pipeline.
 */

import type { ReadTimeResults } from 'reading-time';

/**
 * Reading time data from remark-reading-time plugin
 * @see https://www.npmjs.com/package/reading-time
 */
export interface ReadingTime extends ReadTimeResults {
	/** Human-friendly reading time text (e.g., "3 min read") */
	text: string;
	/** Estimated reading time in minutes */
	minutes: number;
	/** Total time in milliseconds */
	time: number;
	/** Total word count */
	words: number;
}

/**
 * Frontmatter data injected by remark plugins
 *
 * This extends the base schema frontmatter with computed properties
 * added during the Markdown/MDX processing pipeline.
 */
export interface RemarkPluginFrontmatter {
	/**
	 * Reading time statistics
	 * Injected by: remarkReadingTime plugin
	 */
	readingTime: ReadingTime;

	/**
	 * Last modified date from git history (ISO 8601 format)
	 * Injected by: remarkModifiedTime plugin
	 * @example "2025-11-29T14:30:00+07:00"
	 */
	lastModified: string;
}

/**
 * Helper type for accessing frontmatter with full type safety
 *
 * @example
 * ```ts
 * const { Content, remarkPluginFrontmatter } = await render(post);
 * const frontmatter = remarkPluginFrontmatter as RemarkPluginFrontmatter;
 * ```
 */
export type TypedRemarkFrontmatter = RemarkPluginFrontmatter;
