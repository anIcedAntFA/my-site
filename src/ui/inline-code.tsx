import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { cx } from '@brendon1555/panda-cx-deduplicator';
import { css } from '@styled-system/css';
import { inlineCode } from '@styled-system/recipes';

interface InlineCodeProps extends PropsOf<'span'> {
	size?: 'sm' | 'md' | 'lg';
	classes?: string;
}

export const InlineCode = component$(
	({ size = 'md', classes }: InlineCodeProps) => {
		const mergedClasses = cx(
			inlineCode({ size }),
			css({ ml: 3 }),
			css({ ml: 1 }),
			classes,
		);

		return (
			<span class={mergedClasses}>
				<Slot />
			</span>
		);
	},
);
