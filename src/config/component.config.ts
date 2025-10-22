/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	MdAnchorHeading2,
	MdAnchorHeading3,
	MdAnchorHeading4,
	MdCheckbox,
	MdTextLink,
} from '@ui/markdown';

export const MARKDOWN_COMPONENTS = {
	h2: MdAnchorHeading2,
	h3: MdAnchorHeading3,
	h4: MdAnchorHeading4,
	a: MdTextLink,
	'md-checkbox': MdCheckbox,
};
