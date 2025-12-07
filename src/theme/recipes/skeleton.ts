import { defineRecipe } from '@pandacss/dev';

export const skeletonRecipe = defineRecipe({
	className: 'skeleton',
	description: 'Skeleton loading placeholder styles',
	base: {},
	variants: {
		loading: {
			true: {
				borderRadius: 'md',
				boxShadow: 'none',
				backgroundClip: 'padding-box',
				color: 'transparent',
				pointerEvents: 'none',
				userSelect: 'none',
				flexShrink: '0',
				'&::before, &::after, *': {
					visibility: 'hidden',
				},
			},
			false: {
				background: 'unset',
				animation: 'fade-in var(--fade-duration, 0.1s) ease-out !important',
			},
		},
		variant: {
			pulse: {
				background: 'bg.emphasized',
				animation: 'pulse',
				animationDuration: 'var(--duration, 1.2s)',
			},
			shine: {
				'--animate-from': '200%',
				'--animate-to': '-200%',
				'--start-color': 'colors.bg.muted',
				'--end-color': 'colors.bg.emphasized',
				backgroundImage:
					'linear-gradient(270deg, var(--start-color), var(--end-color), var(--end-color), var(--start-color))',
				backgroundSize: '400% 100%',
				animation:
					'bg-position var(--duration, 4s) {easings.ease-in-out} infinite',
			},
			none: {
				animation: 'none',
			},
		},
	},
	defaultVariants: {
		variant: 'pulse',
		loading: true,
	},
});
