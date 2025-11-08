/**
 * Enhanced className utility for Panda CSS atomic class deduplication
 *
 * This is an upgraded version of the standard `cx` function that intelligently
 * deduplicates atomic classes based on their CSS property, ensuring only the
 * last occurrence of each property is kept while preserving non-atomic classes.
 *
 * @example
 * ```typescript
 * cx('bg_red', 'bg_blue', 'p_4') // → 'bg_blue p_4'
 * cx('hover:bg_red', 'bg_blue') // → 'hover:bg_red bg_blue'
 * ```
 *
 * @see {@link https://github.com/brendon1555/panda-cx-deduplicator} Original implementation
 * @see {@link https://github.com/brendon1555/panda-cx-deduplicator/blob/main/src/index.ts} Source code reference
 *
 * @param args - Class name arguments (strings, booleans, null, undefined)
 * @returns Deduplicated class name string
 */

type Argument = string | boolean | null | undefined;

const regex = /(.*\]:)?[^_]*(?=_)|.*(?=\]:)/g;

function cn(...args: Argument[]) {
	// Get all args passed to cx, only keep truthy string values
	const presentClassNames: string[] = Array.prototype.slice
		.call(args)
		.filter(Boolean)
		.filter((arg) => typeof arg === 'string');

	const atomicClasses: { [k: string]: string } = {};
	const nonAtomicClasses: string[] = [];

	presentClassNames.forEach((arg) => {
		// Break args down into individual class names, stripping any empty strings
		const individualClassNames = arg ? arg.split(' ').filter(Boolean) : [];

		individualClassNames.forEach((className) => {
			// Check for atomic class format match
			const matches = className.match(regex);
			if (
				!className.includes('__') /* Slot recipes contain `__` */ &&
				matches
			) {
				// Grab the first part of the class name (before the first '_', but after any `[...]:`)
				// This is the className defined for the atomic property (plus prefixes)
				const key = matches[0];
				atomicClasses[key] = className;
			} else {
				// Just push through non atomic classes
				nonAtomicClasses.push(className);
			}
		});
	});

	const result: string[] = [];

	// Push atomic classes first
	for (const key in atomicClasses) {
		if (Object.hasOwn(atomicClasses, key)) {
			result.push(atomicClasses[key]);
		}
	}
	// Push non atomic classes last
	result.push(...nonAtomicClasses);
	// Return a string of all the classes joined by a space
	return result.join(' ');
}

export { cn };
