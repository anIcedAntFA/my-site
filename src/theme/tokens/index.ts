import { defineTokens } from "@pandacss/dev";

import { assets } from "./assets";
import { borders } from "./borders";
import { colors } from "./colors";
import { durations } from "./durations";
import { easings } from "./easings";
import { fonts } from "./fonts";
import { lineHeights } from "./lineHeights";
import { zIndex } from "./z-index";

export const tokens = defineTokens({
	fonts,
	borders,
	colors,
	durations,
	easings,
	zIndex,
	assets,
	lineHeights,
});
