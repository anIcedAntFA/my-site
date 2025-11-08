import type { Link } from 'mdast'; // Specific type for a Markdown link node in mdast
import type { Node } from 'unist'; // Type for a generic Unist node
import { visit } from 'unist-util-visit';

// This is a Remark plugin. Remark plugins operate on the Markdown Abstract Syntax Tree (mdast).
// This specific plugin adds 'target="_blank"' and 'rel="noopener noreferrer"' attributes
// to external links found in the Markdown content.
export const remarkExternalLinks = () => {
	// Remark plugins return a 'transformer' function. This function receives
	// the AST (Abstract Syntax Tree) as its first argument.
	// We type the tree as a generic Unist Node.
	return (tree: Node) => {
		// The 'unist-util-visit' library allows us to easily traverse the tree
		// and find specific types of nodes. We are looking for nodes of type 'link'.
		// The visitor function receives the node found, its index, and its parent.
		visit(tree, 'link', (node: Link) => {
			// Check if the found node is indeed a link (which 'visit' ensures by type 'link')
			// and importantly, check if its URL property indicates an external link.
			// A common heuristic is to check if the URL starts with 'http://' or 'https://'.
			// You might need to refine this condition based on your specific needs
			// (e.g., handling mailto links, protocol-relative URLs, specific internal links).
			if (
				node.url &&
				(node.url.startsWith('http://') || node.url.startsWith('https://'))
			) {
				// If the link is external, we add/modify properties that will be used
				// when this node is converted into an HTML element later in the pipeline (by rehype).
				// These properties are stored in node.data.hProperties.
				// node.data might not exist, so we initialize it if necessary.
				node.data = node.data || {};
				// node.data.hProperties might not exist, so we initialize it.
				// We cast it to the Properties type from 'hast' for better type safety
				// regarding the structure of HTML attributes.
				node.data.hProperties = node.data.hProperties || {};

				// Add/set the 'target' attribute to '_blank' to open the link in a new tab.
				node.data.hProperties.target = '_blank';

				// Add/set the 'rel' attribute for security and best practices when using target="_blank".
				// 'noopener' prevents the new page from accessing the window.opener property.
				// 'noreferrer' prevents the browser from sending the Referer header.
				// You could use an array like ['noopener', 'noreferrer'] as well,
				// depending on how your renderer handles the 'rel' property type.
				// Sticking to string 'noopener noreferrer' is common and directly matches HTML.
				node.data.hProperties.rel = 'noopener noreferrer';
			}
		});
	};
};
