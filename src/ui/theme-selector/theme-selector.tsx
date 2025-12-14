import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

import { cx } from '@/styled-system/css';
import { icon, iconButton, skeleton } from '@/styled-system/recipes';

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
	skeletonIconStyles,
	stackedIconStyles,
} from './style';
import type { ThemePreference } from './theme-script';
import { getInitialTheme, isThemePreference, useTheme } from './use-theme';

export const ThemeSelector = component$(() => {
	const iconBtnClasses = iconButton({ size: 'md', variant: 'ghost' });
	const iconClass = icon({ mode: 'mask', size: 'lg' });
	const skeletonClass = skeleton({ loading: true, variant: 'pulse' });

	// Start with 'system' on server, will be synced on client
	const selectedTheme = useSignal<ThemePreference>('system');
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
		const option = Array.isArray(value) ? value[0] : value;
		if (isThemePreference(option)) setTheme(option);
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
						<span
							aria-hidden='true'
							class={cx(
								iconBtnClasses.icon,
								iconClass,
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
					<div class={cx(skeletonIconStyles, skeletonClass)} />
				)}
			</Select.Trigger>

			<Select.Popover class={popoverStyles} floating='bottom-end' gutter={4}>
				{THEME_OPTION.map(({ label, value }) => (
					<Select.Item class={itemStyles} key={value} value={value}>
						<Select.ItemLabel class={itemLabelStyles}>{label}</Select.ItemLabel>
						<Select.ItemIndicator class={itemIndicatorStyles}>
							<span aria-hidden='true' class={cx(iconClass, checkIconStyles)} />
						</Select.ItemIndicator>
					</Select.Item>
				))}
			</Select.Popover>
		</Select.Root>
	);
});
