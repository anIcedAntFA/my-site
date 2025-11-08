import { component$, useSignal } from '@builder.io/qwik';

import { Square, styled } from '@/styled-system/jsx';
import { stack } from '@/styled-system/patterns';

export const SonHayHoi = component$(() => {
	const isProblem = useSignal(false);

	return (
		<div
			class={stack({
				gap: 4,
				alignItems: 'center',
				mt: '40px',
			})}
		>
			<Square bg={isProblem.value ? 'red.400' : 'green.400'} size='100px'>
				SonHayHoi Component
				{isProblem.value ? <p>Problem!</p> : <p>No Problem!</p>}
			</Square>
			<styled.button
				bg={isProblem.value ? 'red.500' : 'green.500'}
				color='white'
				onClick$={() => {
					isProblem.value = !isProblem.value;
				}}
				p={2}
				rounded='md'
				type='button'
			>
				Toggle Problem
			</styled.button>
		</div>
	);
});
