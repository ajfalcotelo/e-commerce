export const fetchProductBaseUrl = async <T>(
	path?: string,
	options?: RequestInit,
): Promise<T> => {
	const response = await fetch(
		`https://dummyjson.com/products${path ? path : ""}`,
		options,
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data: T = await response.json();

	return data;
};
