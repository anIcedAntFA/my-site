import type { Element, Root, RootContent } from 'hast';
import { h } from 'hastscript';
import type { Plugin } from 'unified';

interface SectionStackItem {
	level: number;
	sectionElement: Element;
}

const getHeadingLevel = (tagName: string): number | null => {
	if (tagName && tagName.length === 2 && tagName.startsWith('h')) {
		const level = parseInt(tagName[1], 10);
		if (level >= 1 && level <= 6) return level;
	}
	return null;
};

export const rehypeSectionsForHeadings: Plugin<[], Root> = () => {
	return (tree: Root): void => {
		const newRootChildren: RootContent[] = [];
		const sectionStack: SectionStackItem[] = [];

		const finalizeSections = (currentHeadingLevelToCloseUpTo: number): void => {
			while (
				sectionStack.length > 0 &&
				sectionStack[sectionStack.length - 1].level >=
					currentHeadingLevelToCloseUpTo
			) {
				const sectionToClose = sectionStack.pop();
				if (!sectionToClose) continue;

				if (sectionStack.length > 0) {
					sectionStack[sectionStack.length - 1].sectionElement.children.push(
						sectionToClose.sectionElement,
					);
				} else {
					newRootChildren.push(sectionToClose.sectionElement);
				}
			}
		};

		for (const node of tree.children) {
			let processedNode = false;
			if (node.type === 'element') {
				const headingLevel = getHeadingLevel(node.tagName);

				if (headingLevel && headingLevel > 1) {
					// Start sectioning from H2
					finalizeSections(headingLevel);

					const sectionProperties: Record<string, string | undefined> = {
						// Add a marker for client-side script to identify these sections
						'data-section-needs-labelledby': 'true',
					};

					const newSectionElement = h('section', sectionProperties);
					// !IMPORTANT: The heading (node) is the first child of this new section
					newSectionElement.children.push(node);

					sectionStack.push({
						level: headingLevel,
						sectionElement: newSectionElement,
					});
					processedNode = true;
				}
			}

			if (!processedNode) {
				if (sectionStack.length > 0) {
					if (node.type !== 'doctype') {
						sectionStack[sectionStack.length - 1].sectionElement.children.push(
							node,
						);
					}
				} else {
					newRootChildren.push(node);
				}
			}
		}
		finalizeSections(1);
		tree.children = newRootChildren;
	};
};
