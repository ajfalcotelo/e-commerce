import axios, { AxiosError } from "axios";

export type WishlistError = {
	error: string;
};

export const wishlistApi = axios.create({
	baseURL: "http://localhost:8000/api/wishlist",
	headers: {
		"Content-Type": "application/json",
	},
});

wishlistApi.interceptors.response.use(
	(response) => response, // Pass successful responses unchanged
	(error: AxiosError<WishlistError>) => {
		if (error.response) {
			console.error("API Error:", error.response.data?.error);
			return Promise.reject(error.response.data); // Return only the custom error
		} else if (error.request) {
			console.error("No response received:", error.request);
			return Promise.reject({
				message: "No response from server. Please try again.",
			});
		} else {
			console.error("Unexpected Error:", error.message);
			return Promise.reject({ message: "Unexpected error occurred." });
		}
	},
);
