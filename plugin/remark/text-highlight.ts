import type {
	Parent as MdastParent,
	Root as MdastRoot,
	Text as MdastText,
	PhrasingContent,
} from "mdast";
import { SKIP, visit } from "unist-util-visit";

// Define the plugin in the attacher function style, similar to your working examples.
// It returns a transformer function.
export const remarkTextHighlight = () => {
	// The transformer function operates on the MDAST tree.
	return (tree: MdastRoot) => {
		visit(
			tree,
			"text",
			(
				node: MdastText,
				index: number | undefined,
				parent: MdastParent | undefined,
			) => {
				// Safety checks:
				// 1. Ensure parent and index are defined (index should always be defined for children).
				// 2. Crucially, do not process text inside code blocks or inline code.
				//    The 'html' node we create would be escaped or displayed as text there.
				if (
					!parent ||
					index === undefined ||
					parent.type === "inlineCode" ||
					parent.type === "code"
				) {
					return; // Skip this node
				}

				const { value } = node;
				// Non-greedy regex to find ==text==.
				// (.*?) will match any character (except newline by default) as few times as possible.
				const regex = /==(.*?)==/g;
				let match;
				let lastIndex = 0;
				const newChildren: PhrasingContent[] = []; // To hold new text and html nodes
				let hasMatches = false;

				// Loop through all matches of the regex in the current text node's value.
				// We use regex.exec in a loop as it's a common way to iterate over global matches.
				while ((match = regex.exec(value)) !== null) {
					hasMatches = true;
					const [fullMatch, textContent] = match; // fullMatch is "==text==", textContent is "text"
					const matchStartIndex = match.index; // Starting index of fullMatch

					// 1. Add the text segment before the current match (if any)
					if (matchStartIndex > lastIndex) {
						newChildren.push({
							type: "text",
							value: value.slice(lastIndex, matchStartIndex),
						});
					}

					// 2. Add the highlighted part as an MDAST 'html' node
					// This node will be rendered as raw HTML by remark-rehype later.
					newChildren.push({
						type: "html",
						value: `<mark>${textContent}</mark>`,
					});

					// Update lastIndex to the end of the current full match
					lastIndex = matchStartIndex + fullMatch.length;
				}

				// If there were any matches found and processed
				if (hasMatches) {
					// 3. Add any remaining text after the last match
					if (lastIndex < value.length) {
						newChildren.push({ type: "text", value: value.slice(lastIndex) });
					}

					// 4. Replace the original text node in the parent's children array
					//    with the new array of text and HTML nodes.
					parent.children.splice(index, 1, ...newChildren);

					// 5. Tell 'visit' to skip processing the nodes we just inserted
					//    and to continue from the correct new index.
					return [SKIP, index + newChildren.length];
				}
				// If no matches, the original text node remains untouched.
			},
		);
		// No explicit return is needed from the transformer if it modifies the tree in place.
	};
};
