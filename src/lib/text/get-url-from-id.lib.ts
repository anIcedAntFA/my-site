// Helper function to construct the full URL (client-side)
export const getURLFromId = (id?: string): string => {
	if (!id || typeof window === "undefined") return "";
	const { origin, pathname } = window.location;
	return `${origin}${pathname}#${id}`;
};
