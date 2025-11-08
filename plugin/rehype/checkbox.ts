import type { Element, Root } from 'hast';
import { toString as hastToString } from 'hast-util-to-string';
import { h } from 'hastscript';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// Helper to check if a node is an HAST Element
function isElement(node: unknown): node is Element {
	return (
		node !== null &&
		typeof node === 'object' &&
		'type' in node &&
		node.type === 'element'
	);
}

export const rehypeCheckbox: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, 'element', (node) => {
			// Only target list items with the 'task-list-item' class
			if (
				node.tagName !== 'li' ||
				!isElement(node) ||
				!Array.isArray(node.properties?.className) ||
				!node.properties.className.includes('task-list-item')
			) {
				return;
			}

			// Find the checkbox input, whether it's a direct child or nested in a <p>
			let checkboxInput: Element | undefined;
			for (const child of node.children) {
				if (
					isElement(child) &&
					child.tagName === 'input' &&
					child.properties?.type === 'checkbox'
				) {
					checkboxInput = child;
					break;
				}
				if (isElement(child) && child.tagName === 'p') {
					const inputInP = child.children.find(
						(grandchild) =>
							isElement(grandchild) &&
							grandchild.tagName === 'input' &&
							grandchild.properties?.type === 'checkbox',
					) as Element | undefined;
					if (inputInP) {
						checkboxInput = inputInP;
						break;
					}
				}
			}

			if (!checkboxInput) {
				return;
			}

			const isChecked = checkboxInput.properties?.checked === true;

			// Extract text content reliably from the whole list item
			const labelText = hastToString(node).trim();

			// Create the HAST node for our custom component
			const newComponentNode = h('md-checkbox', {
				checked: isChecked,
				text: labelText,
			});

			// Replace the entire content of the <li> with our component.
			// This preserves the <li> tag and its attributes.
			node.children = [newComponentNode];
		});
	};
};
