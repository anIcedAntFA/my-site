/**
 * Converts a string into a URL-friendly, kebab-cased slug.
 *
 * This function performs the following steps:
 * 1. Converts the entire string to lowercase.
 * 2. Replaces any non-alphanumeric characters (except hyphens and spaces) with an empty string.
 * This helps remove unwanted symbols.
 * 3. Replaces all whitespace characters (spaces, tabs, newlines) with a single hyphen.
 * 4. Collapses multiple consecutive hyphens into a single hyphen.
 * 5. Removes any leading or trailing hyphens.
 *
 * @param str The input string to slugify.
 * @returns The slugified string.
 */
export const slugifyStr = (str: string): string => {
	if (!str) {
		return ''; // Return an empty string if the input is null, undefined, or empty
	}

	return str
		.toLowerCase() // 1. Convert to lowercase
		.replace(/[^a-z0-9\s-]/g, '') // 2. Remove non-alphanumeric characters (keep spaces and hyphens for now)
		.replace(/\s+/g, '-') // 3. Replace one or more spaces with a single hyphen
		.replace(/-+/g, '-') // 4. Collapse multiple hyphens into a single hyphen
		.replace(/^-+|-+$/g, ''); // 5. Remove leading and trailing hyphens
};
