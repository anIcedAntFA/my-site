import { $, type Signal, useSignal, useTask$ } from "@builder.io/qwik";

import { copyToClipboard } from "@lib/text";

export type CopiedValue = string | null;

const DEFAULT_TIMEOUT = 4000;

export const useCopyToClipboard = (timeout = DEFAULT_TIMEOUT) => {
	const copiedText: Signal<CopiedValue> = useSignal<CopiedValue>(null);
	const hasCopied: Signal<boolean> = useSignal<boolean>(false);

	useTask$(({ track, cleanup }) => {
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

	const copyText = $(async (text: string) => {
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
