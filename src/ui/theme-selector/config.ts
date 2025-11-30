import { css } from '@/styled-system/css';

import type { ThemePreference } from './theme-script';

interface ThemeOptionItem {
	value: ThemePreference;
	label: string;
	iconClass: string;
}

const iconClasses = {
	sun: css({ maskImage: '{assets.sun}' }),
	moon: css({ maskImage: '{assets.moon}' }),
	monitorCog: css({ maskImage: '{assets.monitorCog}' }),
} as const;

const THEME_OPTION: ThemeOptionItem[] = [
	{ value: 'light', label: 'Light', iconClass: iconClasses.sun },
	{ value: 'dark', label: 'Dark', iconClass: iconClasses.moon },
	{ value: 'system', label: 'System', iconClass: iconClasses.monitorCog },
];

export { THEME_OPTION };
