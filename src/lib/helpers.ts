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

export const convertToLocalTime = (dateStr: string): string => {
	// Create a new Date object from the UTC date string
	const utcDate = new Date(dateStr);

	// Get the local hours and minutes using toLocaleTimeString with options
	const localTime = utcDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false, // This ensures the time is in 24-hour format (HH:mm)
	});

	return localTime;
};
