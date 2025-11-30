import { $, component$ } from '@builder.io/qwik';

import { useCopyToClipboard } from '@/hook/use-copy-to-clipboard';
import { cn } from '@/lib/style';
import { getURLFromId } from '@/lib/text';
import { css, cx } from '@/styled-system/css';
import { iconButton } from '@/styled-system/recipes';
import { Tooltip } from '@/ui/tooltip';

interface CopyLinkButtonProps {
	headingId: string;
}

export const CopyLinkButton = component$(
	({ headingId }: CopyLinkButtonProps) => {
		const iconBtnClasses = iconButton({
			size: 'md',
			variant: 'ghost',
		});

		const { copyText, hasCopied } = useCopyToClipboard();

		const handleCopyURL = $(() => {
			if (hasCopied.value) return;

			const url = getURLFromId(headingId);

			copyText(url)
				.then(() => {
					console.info('URL copied to clipboard:', url);
				})
				.catch((err) => console.error('Failed to copy URL:', err));
		});

		return (
			<Tooltip
				content={
					hasCopied.value
						? 'Link copied to clipboard!'
						: 'Copy link to clipboard'
				}
				placement='right'
			>
				<button
					aria-disabled={hasCopied.value}
					aria-label='Copy URL'
					class={cn(
						iconBtnClasses.root,
						css({
							cursor: hasCopied.value ? 'not-allowed' : 'pointer',
							display: 'inline-flex',
							boxSize: 'revert',
							p: '0.5em',
							opacity: hasCopied.value ? 0.4 : 0,
							transitionProperty: 'scale,opacity',
							// To improve accessibility, it become visible when tab-focused
							_focusVisible: { opacity: 1 },
							_groupHover: { opacity: hasCopied.value ? 0.4 : 1 },
						}),
					)}
					disabled={hasCopied.value}
					onClick$={handleCopyURL}
					type='button'
				>
					<i
						class={cx(
							iconBtnClasses.icon,
							css({
								boxSize: '1em',
								maskImage: '{assets.link}',
							}),
						)}
					/>
				</button>
			</Tooltip>
		);
	},
);
