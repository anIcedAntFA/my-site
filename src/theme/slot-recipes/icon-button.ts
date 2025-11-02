import { defineSlotRecipe } from "@pandacss/dev";

export const iconButtonRecipe = defineSlotRecipe({
	className: "icon-button",
	description: "Styles for the Icon Button component",
	slots: ["root", "icon"],
	base: {
		root: {
			cursor: "pointer",
			display: "flex",
			position: "relative",
			justifyContent: "center",
			alignItems: "center",
			border: "none",
			userSelect: "none",
			transitionDuration: "fast",
			transitionProperty: "scale",
			_disabled: {
				opacity: 0.4,
				pointerEvents: "none",
			},
			_before: {
				inset: "0",
				pos: "absolute",
				scale: 0.8,
				w: "full",
				bg: "accent/10",
				opacity: "0",
				transitionDuration: "normal",
				transitionProperty: "opacity, scale",
				content: '""',
			},
			_active: {
				scale: "0.9",
			},
			_supportHover: {
				"&:not(:disabled):hover::before": {
					scale: "1",
					opacity: 1,
				},
				"&:hover": {
					color: "accent",
				},
			},
		},
		icon: {
			display: "inline-block",
			flexShrink: "0",
			transitionDuration: "normal",
			transitionProperty: "color",
		},
	},
	variants: {
		variant: {
			// TODO: Add outlined style later
			outlined: {},
			ghost: {
				root: {
					bg: "transparent",
				},
				icon: {
					bg: "currentColor",
					maskPosition: "center",
					maskRepeat: "no-repeat",
					maskSize: "cover",
				},
			},
		},
		size: {
			sm: {
				root: {
					boxSize: "9",
					_before: {
						rounded: "sm",
					},
				},
				icon: {
					boxSize: "1.125em",
				},
			},
			md: {
				root: {
					boxSize: "11",
					_before: {
						rounded: "md",
					},
				},
				icon: {
					boxSize: "1.5em",
				},
			},
			lg: {
				root: {
					boxSize: "14",
					_before: {
						rounded: "lg",
					},
				},
				icon: {
					boxSize: "2em",
				},
			},
		},
		rounded: {
			true: {
				root: {
					_before: {
						rounded: "full",
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: "ghost",
		size: "md",
	},
});
