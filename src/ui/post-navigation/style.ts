import { grid } from '@/styled-system/patterns';

const navStyles = grid({
	mt: '6',
	gridTemplateColumns: {
		base: '1fr',
		md: '1fr 1fr',
	},
	gap: {
		base: '6',
		'3xl': '8',
	},
	'& > div:first-child + a': {
		gridColumnStart: '1',
		justifySelf: 'center',
	},
});

export { navStyles };
