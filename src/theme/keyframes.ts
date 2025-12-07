import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
	'shiny-glass': {
		'0%': { left: '-100%' },
		'50%': { left: '120%' },
		'100%': { left: '120%' },
	},
	'icon-cycle-up': {
		'0%': { opacity: 1, transform: 'translateY(0)' },
		'30%': { opacity: 0.5, transform: 'translateY(-100%)' },
		'40%': { opacity: 0, transform: 'translateY(-100%)' },
		'50%': { opacity: 0, transform: 'translateY(100%)' },
		'80%': { opacity: 0.5, transform: 'translateY(-50%)' },
		'100%': { opacity: 1, transform: 'translateY(0)' },
	},
	'slide-fade-scale-in': {
		'0%': { opacity: 0, transform: 'scale(0.8) translateY(-4px)' },
		'100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
	},
	'slide-fade-scale-out': {
		'0%': { opacity: 1, transform: 'scale(1) translateY(0)' },
		'100%': { opacity: 0, transform: 'scale(0.8) translateY(-4px)' },
	},
	'slide-fade-in': {
		'0%': { opacity: 0, transform: 'translateY(-8px)' },
		'100%': { opacity: 1, transform: 'translateY(0)' },
	},
	'slide-fade-out': {
		'0%': { opacity: 1, transform: 'translateY(0)' },
		'100%': { opacity: 0, transform: 'translateY(-8px)' },
	},
	// Skeleton animations
	'fade-in': {
		'0%': { opacity: 0 },
		'100%': { opacity: 1 },
	},
	'bg-position': {
		'0%': { backgroundPosition: 'var(--animate-from, 200%) 0' },
		'100%': { backgroundPosition: 'var(--animate-to, -200%) 0' },
	},
	// Theme icon wrapper animations (Option B)
	wrapperPop: {
		'0%': { transform: 'scale(1) rotate(0deg)' },
		'30%': { transform: 'scale(0.7) rotate(45deg)' },
		'60%': { transform: 'scale(1.15) rotate(-10deg)' },
		'100%': { transform: 'scale(1) rotate(0deg)' },
	},
	wrapperFlip: {
		'0%': { transform: 'rotateY(0deg)' },
		'50%': { transform: 'rotateY(90deg)' },
		'100%': { transform: 'rotateY(0deg)' },
	},
});
