export const conditions = {
	visible: '&[data-visible]',
	supportNestedHover: ['@media (hover: hover) and (pointer: fine)', '&:hover'],
	supportHover: '@media (hover: hover) and (pointer: fine)',
	// Extend the default `dark` condition
	dark: '.dark &, [data-theme="dark"] &',
	blank: '&[target="_blank"]',
	previous: '&[data-direction="previous"]',
	next: '&[data-direction="next"]',
};
