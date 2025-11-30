import { css } from '@/styled-system/css';

import type { ThemePreference } from './theme-script';

interface ThemeOptionItem {
	value: ThemePreference;
	label: string;
	iconClass: string;
}

const themeOptions: ThemeOptionItem[] = [
	{
		value: 'light',
		label: 'Light',
		iconClass: css({ maskImage: '{assets.sun}' }),
	},
	{
		value: 'dark',
		label: 'Dark',
		iconClass: css({ maskImage: '{assets.moon}' }),
	},
	{
		value: 'system',
		label: 'System',
		iconClass: css({ maskImage: '{assets.monitorCog}' }),
	},
];

export { themeOptions };
