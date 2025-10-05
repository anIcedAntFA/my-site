import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { css, cx } from '@styled-system/css';
import { inlineCode } from '@styled-system/recipes';
import type { ColorPalette } from '@styled-system/tokens';

interface InlineCodeProps extends PropsOf<'span'> {
	// variant?: 'subtle' | 'surface';
	size?: 'sm' | 'md' | 'lg';
	colorPalette?: ColorPalette;
}

export const InlineCode = component$(
	({ size = 'md', colorPalette = 'base' }: InlineCodeProps) => {
		const classes = inlineCode({ size });

		const palletteClasses = css({ colorPalette });

		return (
			<span class={cx(palletteClasses, classes)}>
				<Slot />
			</span>
		);
	},
);
