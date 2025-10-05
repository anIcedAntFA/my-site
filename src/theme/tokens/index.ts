import { defineTokens } from '@pandacss/dev';

import { borders } from './borders';
import { colors } from './colors';
import { durations } from './durations';
import { easings } from './easings';
import { fonts } from './fonts';
import { zIndex } from './z-index';

export const tokens = defineTokens({
	fonts,
	borders,
	colors,
	durations,
	easings,
	zIndex,
});
