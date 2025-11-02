const round = (num: number) =>
	num.toFixed(7).replace(/0+$/, "").replace(/\.$/, "");
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

export { em, rem, round };
