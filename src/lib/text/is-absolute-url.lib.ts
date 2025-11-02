export const isAbsoluteURL = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch (err: unknown) {
		console.error("Error parsing URL:", err);
		return false;
	}
};
