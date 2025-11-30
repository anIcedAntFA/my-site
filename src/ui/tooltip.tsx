import {
	$,
	component$,
	Slot,
	useOnDocument,
	useSignal,
} from '@builder.io/qwik';

import { v4 as uuid } from 'uuid';

import { tooltip } from '@/styled-system/recipes';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipSize = 'sm' | 'md' | 'lg';

interface TooltipProps {
	/** The content to display in the tooltip */
	content: string;
	/** Position of the tooltip relative to the trigger */
	placement?: TooltipPosition;
	/** Allow interaction with tooltip content (keeps tooltip open when hovering over it) */
	interactive?: boolean;
	/** Size of the tooltip */
	size?: TooltipSize;
}

export const Tooltip = component$<TooltipProps>(
	({ content, placement = 'top', size = 'md', interactive = false }) => {
		const classes = tooltip({ placement, interactive, size });
		const tooltipId = `tooltip-${uuid()}`;
		const isHiddenByEscape = useSignal(false);

		// Handle Escape key to close tooltip
		useOnDocument(
			'keydown',
			$((event) => {
				if (event.key === 'Escape') {
					isHiddenByEscape.value = true;
				}
			}),
		);

		// Reset hidden state when mouse enters or focus
		const handleShow = $(() => {
			isHiddenByEscape.value = false;
		});

		return (
			<div
				aria-describedby={tooltipId}
				class={classes.trigger}
				data-tooltip-hidden={isHiddenByEscape.value ? '' : undefined}
				data-tooltip-trigger
				onFocusIn$={handleShow}
				onMouseEnter$={handleShow}
			>
				<Slot />
				<span
					class={classes.content}
					data-tooltip-text
					id={tooltipId}
					role='tooltip'
				>
					{content}
					<span aria-hidden='true' class={classes.arrow} />
				</span>
			</div>
		);
	},
);
