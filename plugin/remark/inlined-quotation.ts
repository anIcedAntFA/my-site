import type {
	Html as MdastHtml,
	Paragraph as MdastParagraph,
	PhrasingContent,
	Root as MdastRoot,
} from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

function escapeHtmlAttr(unsafe: string): string {
	if (typeof unsafe !== 'string') return '';
	return unsafe.replace(/"/g, '&quot;');
}

function escapeHtmlContent(text: string): string {
	if (typeof text !== 'string') return '';
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/**
 * Helper function to process a single string of text for simple ""quote"" patterns.
 * Returns an array of Text and Html (<q>) nodes.
 */
function processTextForSimpleQuotes(textValue: string): PhrasingContent[] {
	const resultingNodes: PhrasingContent[] = [];
	const simpleQuoteRegex = /""(.*?)""/g;
	simpleQuoteRegex.lastIndex = 0; // Reset global regex

	let match;
	let lastSubIndex = 0;

	while ((match = simpleQuoteRegex.exec(textValue)) !== null) {
		const [fullSimpleMatch, simpleTextContent] = match;
		const simpleMatchStartIndex = match.index;

		if (simpleMatchStartIndex > lastSubIndex) {
			resultingNodes.push({
				type: 'text',
				value: textValue.slice(lastSubIndex, simpleMatchStartIndex),
			});
		}
		resultingNodes.push({
			type: 'html',
			value: `<q>${escapeHtmlContent(simpleTextContent)}</q>`,
		} as MdastHtml);
		lastSubIndex = simpleMatchStartIndex + fullSimpleMatch.length;
	}

	if (lastSubIndex < textValue.length) {
		resultingNodes.push({ type: 'text', value: textValue.slice(lastSubIndex) });
	}

	return resultingNodes.length > 0
		? resultingNodes
		: [{ type: 'text', value: textValue }];
}

export const remarkInlinedQuotation: Plugin<[], MdastRoot> = () => {
	// Regex to find text ending with ""...CITE:: (captures text before "" and quote content)
	// Group 1: (leading text before the opening "" of this specific CITE quote)
	// Group 2: (the actual quote content, between "" and CITE::)
	const complexQuoteStartTextRegex = /^(.*)""(.*?)\s*CITE::\s*$/i; // Non-greedy for leading text

	return (tree: MdastRoot) => {
		visit(tree, 'paragraph', (paragraphNode: MdastParagraph) => {
			if (!paragraphNode.children || paragraphNode.children.length === 0) {
				return;
			}

			// Stage 1: Process all text nodes for simple ""quote"" patterns first.
			// This might create more nodes in a new temporary array.
			let stage1Children: PhrasingContent[] = [];
			for (const child of paragraphNode.children) {
				if (child.type === 'text') {
					stage1Children.push(...processTextForSimpleQuotes(child.value));
				} else {
					stage1Children.push(child);
				}
			}

			// Stage 2: Process the result of Stage 1 for the complex Text-Link-Text CITE::URL pattern.
			const finalChildren: PhrasingContent[] = [];
			let i = 0;
			while (i < stage1Children.length) {
				const node1 = stage1Children[i];
				const node2 = stage1Children[i + 1];
				const node3 = stage1Children[i + 2];

				let processedComplex = false;

				if (
					node1?.type === 'text' &&
					node2?.type === 'link' &&
					node3?.type === 'text'
				) {
					const textNode1 = node1;
					const linkNode = node2;
					const textNode3 = node3;

					const matchStart = textNode1.value.match(complexQuoteStartTextRegex);

					if (matchStart && textNode3.value.startsWith('""')) {
						const leadingTextInNode1 = matchStart[1]; // Text in node1 *before* the opening "" of the CITE quote
						const quoteContentFromNode1 = matchStart[2].trimEnd(); // Quote text from node1 (up to CITE::)
						const citeUrl = linkNode.url;

						// Add the leading text from node1 (if any)
						// This leading text should have already been processed for simple quotes by Stage 1
						// if textNode1 was a result of processTextForSimpleQuotes.
						// However, processTextForSimpleQuotes returns an array.
						// This implies stage1Children should be flat.
						if (leadingTextInNode1) {
							// Re-process this leading text for simple quotes, in case it contained them
							// and this specific text node was an original one.
							finalChildren.push(
								...processTextForSimpleQuotes(leadingTextInNode1),
							);
						}

						let qTagHtml = '<q';
						if (citeUrl) {
							qTagHtml += ` cite="${escapeHtmlAttr(citeUrl.trim())}"`;
						}
						qTagHtml += `>${escapeHtmlContent(quoteContentFromNode1)}</q>`;
						finalChildren.push({ type: 'html', value: qTagHtml } as MdastHtml);

						const trailingTextInNode3 = textNode3.value.substring(2); // Text after "" in node3
						if (trailingTextInNode3) {
							// Re-process this trailing text for simple quotes
							finalChildren.push(
								...processTextForSimpleQuotes(trailingTextInNode3),
							);
						}

						i += 3; // Consumed three nodes from stage1Children
						processedComplex = true;
					}
				}

				if (!processedComplex) {
					if (node1) {
						// If node1 (from stage1Children) wasn't part of a complex pattern
						finalChildren.push(node1); // Add it (it might be a TextNode or an HtmlNode from stage1)
					}
					i++;
				}
			}
			paragraphNode.children = finalChildren;
		});
	};
};
