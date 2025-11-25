import type { Root } from 'mdast'; // Type for the root node of a Markdown AST
import { toString as mdastToString } from 'mdast-util-to-string';
import type { ReadTimeResults } from 'reading-time'; // Type for the output of the reading-time library
import getReadingTime from 'reading-time';
import type { Node } from 'unist'; // General Unist node type
import type { VFile } from 'vfile';

// Define the expected structure of the 'data' object provided by the processor
// when working with Astro content collections.
// Astro exposes the frontmatter here.
interface AstroData {
	astro: {
		frontmatter: Record<string, any>; // Frontmatter is typically a map of strings to any value
		// Add other Astro-specific properties under 'astro' if needed by other plugins
	};
	// Allow other potential properties on the data object from the unified pipeline
	[key: string]: any;
}

// This is a Remark plugin. Remark plugins operate on the Markdown Abstract Syntax Tree (mdast).
// This plugin calculates the estimated reading time of the Markdown content
// and adds it to the content entry's frontmatter.
export const remarkReadingTime = () => {
	// The plugin returns a transformer function that matches the standard signature:
	// (tree: Root, file: VFile) => Root | void | Promise<Root | void>
	// We type the tree as Root and the file as VFile.
	return (tree: Root, file: VFile) => {
		// Convert the entire Markdown AST to a plain text string.
		// Casting to Node is often needed for mdastToString compatibility.
		const textOnPage: string = mdastToString(tree as Node);
		// Use the 'reading-time' library to calculate the reading time.
		// The getReadingTime function returns an object with various details.
		const readingTime: ReadTimeResults = getReadingTime(textOnPage);

		// >>> Access the data via file.data <<<
		// We know from Astro's pipeline that file.data will contain the 'astro' property
		// with frontmatter. We use a type assertion ('as AstroDataInVFile')
		// to tell TypeScript to trust that file.data has this specific shape,
		// allowing us to access data.astro.frontmatter safely in terms of typing.
		const astroData = file.data as AstroData;

		// Ensure the nested structure exists before assigning, adding a layer of runtime safety
		// although Astro's content pipeline should provide data.astro.frontmatter.
		astroData.astro = astroData.astro || { frontmatter: {} };
		astroData.astro.frontmatter = astroData.astro.frontmatter || {};

		// The 'readingTime' object includes a 'text' property, which is a human-friendly string
		// representing the estimated reading time (e.g., "3 min read").
		// We store this string in the frontmatter of the content entry.
		// Astro content entries expose their frontmatter through 'data.astro.frontmatter'.
		// We ensure the frontmatter object exists and then assign the reading time text to 'minutesRead'.
		astroData.astro.frontmatter.minutesRead = readingTime.text;

		// No return needed as we modified file.data in place.
	};
};
