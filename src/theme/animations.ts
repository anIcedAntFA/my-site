import { defineAnimationStyles } from '@pandacss/dev';

export const animationStyles = defineAnimationStyles({
	'slide-fade-scale-in': {
		description: 'Slide fade scale in animation',
		value: {
			animationName: 'slide-fade-scale-in',
			animationDuration: 'medium',
			animationTimingFunction: 'ease-out',
			transformOrigin: 'var(--transform-origin, top)',
		},
	},
	'slide-fade-scale-out': {
		description: 'Slide fade scale out animation',
		value: {
			animationName: 'slide-fade-scale-out',
			animationDuration: 'fast',
			animationTimingFunction: 'ease-in',
			transformOrigin: 'var(--transform-origin, top)',
		},
	},
});
