import { $, component$ } from '@builder.io/qwik';

import { useCopyToClipboard } from '@hook/use-copy-to-clipboard';
import { getURLFromId } from '@lib/text';
import { css, cx } from '@styled-system/css';
import { icon } from '@styled-system/recipes';

interface CopyLinkButtonProps {
	headingId: string;
}

export const CopyLinkButton = component$(
	({ headingId }: CopyLinkButtonProps) => {
		const iconClass = icon({ mode: 'mask', size: 'md' });

		const { copyText, hasCopied } = useCopyToClipboard();

		const handleCopyURL = $(() => {
			if (hasCopied.value) return;

			const url = getURLFromId(headingId);

			copyText(url)
				.then(() => console.info('URL copied to clipboard:', url))
				.catch((err) => console.error('Failed to copy URL:', err));
		});

		return (
			<button
				type='button'
				aria-label='Copy URL'
				title='Copy to clipboard'
				onClick$={handleCopyURL}
				disabled={hasCopied.value}
				class={css({
					cursor: hasCopied.value ? 'not-allowed' : 'pointer',
					display: 'inline-flex',
					pos: 'relative',
					p: '0.5em',
					opacity: hasCopied.value ? 0.4 : 0,
					userSelect: 'none',
					transition: 'opacity, color',
					transitionDuration: 'normal',
					_before: {
						inset: '0',
						pos: 'absolute',
						transform: 'auto',
						scale: 0.6,
						rounded: 'md',
						w: 'full',
						bg: 'accent/10',
						opacity: '0',
						transition: 'opacity, scale',
						transitionDuration: 'normal',
						content: '""',
					},
					_groupHover: {
						opacity: hasCopied.value ? 0.4 : 1,
					},
					_supportHover: {
						'&:not(:disabled):hover::before': {
							scale: 1,
							opacity: 1,
						},
						'&:hover': {
							color: 'accent',
						},
					},
				})}
			>
				<i
					class={cx(
						iconClass,
						css({
							maskImage: '{assets.link}',
						}),
					)}
				></i>
			</button>
		);
	},
);
