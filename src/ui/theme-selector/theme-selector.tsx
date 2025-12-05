import { $, component$, useSignal } from '@builder.io/qwik';

import { Select } from '@qwik-ui/headless';

import { cx } from '@/styled-system/css';
import { icon, iconButton } from '@/styled-system/recipes';

import { THEME_OPTION } from './config';
import {
	checkIconStyles,
	itemIndicatorStyles,
	itemLabelStyles,
	itemStyles,
	popoverStyles,
	selectRootStyles,
} from './style';
import type { ThemePreference } from './theme-script';
import { isThemePreference, useTheme } from './use-theme';

export const ThemeSelector = component$(() => {
	const iconBtnClasses = iconButton({
		size: 'md',
		variant: 'ghost',
	});
	const iconClasses = icon({ mode: 'mask', size: 'lg' });

	const selectedTheme = useSignal<ThemePreference>('system');

	const { setTheme } = useTheme(selectedTheme);

	const onSelectTheme$ = $((value: string | string[]) => {
		const theme = Array.isArray(value) ? value[0] : value;
		if (isThemePreference(theme)) setTheme(theme);
	});

	// Get current theme icon class for trigger
	const currentIconClass =
		THEME_OPTION.find((opt) => opt.value === selectedTheme.value)?.iconClass ||
		THEME_OPTION[0].iconClass;

	return (
		<Select.Root
			class={selectRootStyles}
			loop
			onChange$={onSelectTheme$}
			bind:value={selectedTheme}
		>
			<Select.Trigger aria-label='Select theme' class={iconBtnClasses.root}>
				<i
					aria-hidden='true'
					class={cx(iconBtnClasses.icon, currentIconClass)}
				/>
			</Select.Trigger>

			<Select.Popover class={popoverStyles} floating='bottom-end' gutter={4}>
				{THEME_OPTION.map(({ label, value }) => (
					<Select.Item class={itemStyles} key={value} value={value}>
						<Select.ItemLabel class={itemLabelStyles}>{label}</Select.ItemLabel>
						<Select.ItemIndicator class={itemIndicatorStyles}>
							<i aria-hidden='true' class={cx(iconClasses, checkIconStyles)} />
						</Select.ItemIndicator>
					</Select.Item>
				))}
			</Select.Popover>
		</Select.Root>
	);
});
