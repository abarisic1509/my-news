export const itemsPerPage = 25;

export const getBaseUrl = () => {
	const baseUrl = import.meta.env.VITE_API_URL;

	if (!baseUrl) {
		throw new Error("Base URL is not defined!");
	}
	return baseUrl;
};
export const getApiKey = () => {
	const baseUrl = import.meta.env.VITE_API_KEY;

	if (!baseUrl) {
		throw new Error("Api key is not defined!");
	}
	return baseUrl;
};
