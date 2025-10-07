import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { button } from '@styled-system/recipes';

interface ButtonProps extends PropsOf<'button'> {
	variant?: 'contained' | 'outlined';
	size?: 'sm' | 'md' | 'lg';
}

export const Button = component$(
	({ variant = 'outlined', size = 'md', ...buttonProps }: ButtonProps) => {
		const classes = button({ size, variant });

		return (
			<button type='button' class={classes.root} {...buttonProps}>
				<span class={classes.content}>
					<Slot />
				</span>
			</button>
		);
	},
);
