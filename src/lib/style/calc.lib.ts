const TRAILING_ZEROS = /0+$/;
const TRAILING_DOT = /\.$/;

const round = (num: number) =>
	num.toFixed(7).replace(TRAILING_ZEROS, '').replace(TRAILING_DOT, '');
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

export { em, rem, round };
