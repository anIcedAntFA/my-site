import type {
	BlockContent,
	Blockquote as MdastBlockquote,
	DefinitionContent,
	Root as MdastRoot,
} from 'mdast';
import { toString as mdastToString } from 'mdast-util-to-string';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export interface BlockquoteCiteUrlOptions {
	citeUrlLineRegex?: RegExp;
}

// Regex: matches "CITE::" (case-insensitive) at the start of a line,
// followed by optional whitespace, then captures the first sequence of non-whitespace characters (the URL).
// It allows for other text after the URL, but only the first non-whitespace block is captured.
const DEFAULT_CITE_URL_REGEX = /^\s*CITE::\s*(\S+)/i;

export const remarkBlockQuotationCiteURL: Plugin<
	[BlockquoteCiteUrlOptions?],
	MdastRoot
> = (options) => {
	const citeUrlRegex = options?.citeUrlLineRegex || DEFAULT_CITE_URL_REGEX;

	return (tree: MdastRoot) => {
		visit(tree, 'blockquote', (blockquoteNode: MdastBlockquote) => {
			if (!blockquoteNode.children || blockquoteNode.children.length === 0) {
				return;
			}

			let citeUrl: string | undefined = undefined;
			// Children of a blockquote are FlowContent (BlockContent | DefinitionContent)
			const newChildren: Array<BlockContent | DefinitionContent> = [];

			for (const child of blockquoteNode.children) {
				let isCiteUrlParagraph = false;
				if (child.type === 'paragraph') {
					// Get the full text content of the paragraph to check against the regex
					const paragraphText = mdastToString(child); // Get raw text, trim later or adjust regex

					// ---- DEBUG LOGGING (Optional: remove after testing) ----
					// console.log(`Checking paragraph: "${paragraphText}"`);
					// console.log(`Regex: ${citeUrlRegex}`);
					// ----------------------------------------------------------

					const citeMatch = paragraphText.trim().match(citeUrlRegex);

					if (citeMatch && citeMatch[1]) {
						citeUrl = citeMatch[1];
						isCiteUrlParagraph = true;
						// console.log(`  -> Matched CITE:: URL: ${citeUrl}`); // DEBUG
					} else {
						// console.log(`  -> No CITE:: match.`); // DEBUG
					}
				}

				if (!isCiteUrlParagraph) {
					newChildren.push(child);
				}
			}

			blockquoteNode.children = newChildren;

			if (citeUrl) {
				blockquoteNode.data = blockquoteNode.data || {};
				blockquoteNode.data.hProperties = blockquoteNode.data.hProperties || {};
				blockquoteNode.data.hProperties.cite = citeUrl;
			}
		});
	};
};
