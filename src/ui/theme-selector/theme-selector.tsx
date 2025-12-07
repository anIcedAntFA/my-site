import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

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
	scaleBounceActiveStyles,
	scaleBounceInactiveStyles,
	selectRootStyles,
	skeletonStyles,
	stackedIconStyles,
} from './style';
import type { ThemePreference } from './theme-script';
import { getInitialTheme, isThemePreference, useTheme } from './use-theme';

export const ThemeSelector = component$(() => {
	const iconBtnClasses = iconButton({ size: 'md', variant: 'ghost' });
	const iconClasses = icon({ mode: 'mask', size: 'lg' });

	// Start with 'system' on server, will be synced on client
	const selectedTheme = useSignal<ThemePreference>(getInitialTheme());
	// Track if client has synced the theme
	const isReady = useSignal(false);

	const { setTheme } = useTheme(selectedTheme);

	// Sync theme from localStorage/DOM on client hydration
	// biome-ignore lint/correctness/noQwikUseVisibleTask: Need client-side DOM/localStorage access
	useVisibleTask$(() => {
		const storedTheme = getInitialTheme();
		selectedTheme.value = storedTheme;
		isReady.value = true;
	});

	const onSelectTheme$ = $((value: string | string[]) => {
		const theme = Array.isArray(value) ? value[0] : value;
		if (isThemePreference(theme)) setTheme(theme);
	});

	return (
		<Select.Root
			class={selectRootStyles}
			loop
			onChange$={onSelectTheme$}
			bind:value={selectedTheme}
		>
			<Select.Trigger
				aria-label='Select theme'
				class={iconBtnClasses.root}
				disabled={!isReady.value}
			>
				{/* Theme icons - only show when ready */}
				{isReady.value ? (
					THEME_OPTION.map(({ value, maskImageClass }) => (
						<i
							aria-hidden='true'
							class={cx(
								iconBtnClasses.icon,
								iconClasses,
								maskImageClass,
								stackedIconStyles,
								selectedTheme.value === value
									? scaleBounceActiveStyles
									: scaleBounceInactiveStyles,
							)}
							key={value}
						/>
					))
				) : (
					// Skeleton while loading
					<div class={skeletonStyles} />
				)}
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
