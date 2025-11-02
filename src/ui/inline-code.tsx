import { component$, type PropsOf, Slot } from "@builder.io/qwik";

import { cn } from "@lib/style/cn.lib";
import { inlineCode } from "@styled-system/recipes";

interface InlineCodeProps extends PropsOf<"span"> {
	size?: "sm" | "md" | "lg";
	classes?: string;
}

export const InlineCode = component$(
	({ size = "md", classes }: InlineCodeProps) => {
		return (
			<span class={cn(inlineCode({ size }), classes)}>
				<Slot />
			</span>
		);
	},
);
