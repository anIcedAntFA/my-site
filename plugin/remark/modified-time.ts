import { execSync } from "child_process";
import type { Root } from 'mdast'; // Type for the root node of a Markdown AST
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


export const remarkModifiedTime = () => {
  return (tree: Root, file: VFile) => {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);

    const astroData = file.data as AstroData;

		astroData.astro = astroData.astro || { frontmatter: {} };
		astroData.astro.frontmatter = astroData.astro.frontmatter || {};

    astroData.astro.frontmatter.lastModified = result.toString();
  };
}
