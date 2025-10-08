import { defineTokens } from '@pandacss/dev';

export const durations = defineTokens.durations({
	fastest: { value: '50ms' },
	faster: { value: '100ms' },
	fast: { value: '150ms' },
	normal: { value: '200ms' },
	slow: { value: '300ms' },
	slower: { value: '400ms' },
	slowest: { value: '500ms' },
	long: { value: '600ms' },
	longer: { value: '800ms' },
	longest: { value: '1000ms' },
	extended: { value: '1200ms' },
	extreme: { value: '1400ms' },
	ultimate: { value: '1600ms' },
});
