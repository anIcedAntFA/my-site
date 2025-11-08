import { component$, type PropsOf, Slot } from '@builder.io/qwik';

import { cn } from '@/lib/style';
import { button } from '@/styled-system/recipes';

interface ButtonProps extends PropsOf<'button'> {
	variant?: 'contained' | 'outlined';
	size?: 'sm' | 'md' | 'lg';
	classes?: string;
}

export const Button = component$(
	({
		variant = 'outlined',
		size = 'md',
		classes,
		...buttonProps
	}: ButtonProps) => {
		const { root, content } = button({ size, variant });

		return (
			<button class={cn(root, classes)} type='button' {...buttonProps}>
				<span class={content}>
					<Slot />
				</span>
			</button>
		);
	},
);
