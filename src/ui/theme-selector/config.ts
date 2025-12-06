import { css } from '@/styled-system/css';

import type { ThemePreference } from './theme-script';

interface ThemeOptionItem {
	value: ThemePreference;
	label: string;
	maskImageClass: string;
}

const iconMaskImage = {
	sun: css({ maskImage: '{assets.sun}' }),
	moon: css({ maskImage: '{assets.moon}' }),
	monitorCog: css({ maskImage: '{assets.monitorCog}' }),
} as const;

const THEME_OPTION: ThemeOptionItem[] = [
	{ value: 'light', label: 'Light', maskImageClass: iconMaskImage.sun },
	{ value: 'dark', label: 'Dark', maskImageClass: iconMaskImage.moon },
	{
		value: 'system',
		label: 'System',
		maskImageClass: iconMaskImage.monitorCog,
	},
];

export { THEME_OPTION };
