/**
 * Copies text to the clipboard using the Clipboard API.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} - A promise that resolves to true if successful, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	// Check if the Clipboard API is available
	if (!navigator.clipboard) {
		console.warn('Clipboard API not available');
		return false;
	}

	try {
		// Attempt to write the text to the clipboard
		await navigator.clipboard.writeText(text);
		return true; // Success
	} catch (error) {
		// Log any errors that occur during copying
		console.warn('Failed to copy:', error);
		return false; // Failure
	}
};
