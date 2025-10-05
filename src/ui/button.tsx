import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { css, cx } from '@styled-system/css';
import { button } from '@styled-system/recipes';
import type { ColorPalette } from '@styled-system/tokens';

interface ButtonProps extends PropsOf<'button'> {
	variant?: 'contained' | 'outlined';
	size?: 'sm' | 'md' | 'lg';
	colorPalette?: ColorPalette;
}

export const Button = component$(
	({
		variant = 'outlined',
		size = 'md',
		colorPalette = 'base',
		...buttonProps
	}: ButtonProps) => {
		const classes = button({ size, variant });

		// Apply colorPalette using css function
		const paletteClass = css({ colorPalette });

		return (
			<button
				type='button'
				class={cx(paletteClass, classes.root)}
				{...buttonProps}
			>
				<span class={cx(paletteClass, classes.content)}>
					<Slot />
				</span>
			</button>
		);
	},
);
