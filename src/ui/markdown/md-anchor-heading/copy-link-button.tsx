import { $, component$ } from "@builder.io/qwik";

import { useCopyToClipboard } from "@hook/use-copy-to-clipboard";
import { cn } from "@lib/style/cn.lib";
import { getURLFromId } from "@lib/text";
import { css, cx } from "@styled-system/css";
import { iconButton } from "@styled-system/recipes";

interface CopyLinkButtonProps {
	headingId: string;
}

export const CopyLinkButton = component$(
	({ headingId }: CopyLinkButtonProps) => {
		const iconBtnClasses = iconButton({
			size: "md",
			variant: "ghost",
		});

		const { copyText, hasCopied } = useCopyToClipboard();

		const handleCopyURL = $(() => {
			if (hasCopied.value) return;

			const url = getURLFromId(headingId);

			copyText(url)
				// TODO: Show a toast notification
				.then(() => console.info("URL copied to clipboard:", url))
				.catch((err) => console.error("Failed to copy URL:", err));
		});

		return (
			<button
				type="button"
				aria-label="Copy URL"
				title="Copy to clipboard"
				onClick$={handleCopyURL}
				disabled={hasCopied.value}
				aria-disabled={hasCopied.value}
				class={cn(
					iconBtnClasses.root,
					css({
						cursor: hasCopied.value ? "not-allowed" : "pointer",
						display: "inline-flex",
						boxSize: "revert",
						p: "0.5em",
						opacity: hasCopied.value ? 0.4 : 0,
						transitionProperty: "scale,opacity",
						// To improve accessibility, it become visible when tab-focused
						_focusVisible: { opacity: 1 },
						_groupHover: { opacity: hasCopied.value ? 0.4 : 1 },
					}),
				)}
			>
				<i
					class={cx(
						iconBtnClasses.icon,
						css({
							boxSize: "1em",
							maskImage: "{assets.link}",
						}),
					)}
				></i>
			</button>
		);
	},
);
