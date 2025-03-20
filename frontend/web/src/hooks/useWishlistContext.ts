import { WishlistContext } from "@/context/WishlistContext";
import { useContext } from "react";

export const useWishlistContext = () => {
	const context = useContext(WishlistContext);

	if (!context) {
		throw new Error(
			"useWishlistContext must be used within a WishlistProvider",
		);
	}

	return context;
};
