import { component$, type PropsOf, Slot } from "@builder.io/qwik";

import { cn } from "@lib/style/cn.lib";
import { button } from "@styled-system/recipes";

interface ButtonProps extends PropsOf<"button"> {
	variant?: "contained" | "outlined";
	size?: "sm" | "md" | "lg";
	classes?: string;
}

export const Button = component$(
	({
		variant = "outlined",
		size = "md",
		classes,
		...buttonProps
	}: ButtonProps) => {
		const { root, content } = button({ size, variant });

		return (
			<button type="button" class={cn(root, classes)} {...buttonProps}>
				<span class={content}>
					<Slot />
				</span>
			</button>
		);
	},
);
