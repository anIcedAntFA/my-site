import type { Paragraph as MdastParagraph, Root as MdastRoot } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

interface IOptions {
	marker?: string; // Allow customizing the marker
}

const DEFAULT_MARKER = '+> '; // Default marker for drop cap paragraphs

export const remarkDropCapParagraph: Plugin<[IOptions?], MdastRoot> = (
	options,
) => {
	const marker = options?.marker || DEFAULT_MARKER; // Default marker
	const markerLength = marker.length;

	return (tree: MdastRoot) => {
		visit(tree, 'paragraph', (node: MdastParagraph) => {
			if (node.children && node.children.length > 0) {
				const firstChild = node.children[0];

				// Check if the first child is a text node and starts with our marker
				if (firstChild.type === 'text' && firstChild.value.startsWith(marker)) {
					// Remove the marker from the text node's value
					firstChild.value = firstChild.value
						.substring(markerLength)
						.trimStart(); // Also trim leading space after marker

					// If the text node becomes empty after removing the marker and trimming, remove the node.
					// This handles cases like "+> " followed by an image or other non-text element.
					if (firstChild.value === '') {
						node.children.shift();
					}

					// If after removing the marker, the paragraph is empty,
					// we might still want to add the attribute, or not.
					// For now, we'll add it. CSS can decide not to style an empty paragraph.
					// if (node.children.length === 0) {
					//   return; // Optionally, don't mark empty paragraphs
					// }

					// Ensure node.data and node.data.hProperties exist
					node.data = node.data || {};
					const hProperties = node.data.hProperties || {};

					// Add the data attribute without a value
					hProperties['data-drop-cap'] = '';

					node.data.hProperties = hProperties;
				}
			}
		});
	};
};
