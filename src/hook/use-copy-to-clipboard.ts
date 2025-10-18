import { $, type Signal, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import { copyToClipboard } from '@lib/text';

export type CopiedValue = string | null;

const DEFAULT_TIMEOUT = 2000;

export const useCopyToClipboard = (timeout = DEFAULT_TIMEOUT) => {
	const copiedText: Signal<CopiedValue> = useSignal<CopiedValue>(null);
	const hasCopied: Signal<boolean> = useSignal<boolean>(false);

	// Client-only effect that watches hasCopied and clears timeout on cleanup
	useVisibleTask$(({ track, cleanup }) => {
		// track the signal so this effect reruns when hasCopied changes
		track(() => hasCopied.value);

		if (hasCopied.value) {
			const id = window.setTimeout(() => {
				hasCopied.value = false;
			}, timeout);

			cleanup(() => {
				window.clearTimeout(id);
			});
		}
	});

	// copyText must be $ so that it can be invoked from the client and lazy-loaded
	const copyText = $(async (text: string) => {
		// TEXT_LIB.copyToClipboard should itself be client-friendly
		const isCopied = await copyToClipboard(text);
		hasCopied.value = isCopied;
		copiedText.value = isCopied ? text : null;
	});

	return {
		copiedText,
		hasCopied,
		copyText,
	};
};
