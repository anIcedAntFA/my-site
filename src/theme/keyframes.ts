import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
	"shiny-glass": {
		"0%": { left: "-100%" },
		"50%": { left: "120%" },
		"100%": { left: "120%" },
	},
	"icon-cycle-up": {
		"0%": { opacity: 1, transform: "translateY(0)" },
		"30%": { opacity: 0.5, transform: "translateY(-100%)" },
		"40%": { opacity: 0, transform: "translateY(-100%)" },
		"50%": { opacity: 0, transform: "translateY(100%)" },
		"80%": { opacity: 0.5, transform: "translateY(-50%)" },
		"100%": { opacity: 1, transform: "translateY(0)" },
	},
});
