import { wishlistApi } from "@/api/wishlistApi";
import { ProductType } from "@/context/ProductContext";
import {
	addedAtToDateISOString,
	WishlistContext,
	WishlistState,
	WishlistType,
} from "@/context/WishlistContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useReducer } from "react";

export type WishlistAction =
	| {
			type: "ADD";
			payload: WishlistType;
	  }
	| {
			type: "SET";
			payload: WishlistType[];
	  }
	| {
			type: "UPDATE_ITEM";
			payload: WishlistType;
			index: number;
	  }
	| {
			type: "REMOVE_ITEM";
			payload: ProductType;
	  }
	| {
			type: "DELETE";
	  };

const WishlistReducer = (
	state: WishlistState,
	action: WishlistAction,
): WishlistState => {
	switch (action.type) {
		case "ADD":
			return { wishlist: [action.payload, ...state.wishlist] };
		case "SET":
			return { wishlist: action.payload };
		case "UPDATE_ITEM":
			return {
				wishlist: [
					...state.wishlist.slice(0, action.index),
					action.payload,
					...state.wishlist.slice(action.index + 1),
				],
			};
		case "REMOVE_ITEM":
			return {
				wishlist: [
					...state.wishlist.filter(
						(item) => item.product._id != action.payload._id,
					),
				],
			};
		case "DELETE":
			return { wishlist: [] };
		default:
			return state;
	}
};

export const WishlistProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(WishlistReducer, { wishlist: [] });
	const { user } = useAuthContext();

	console.log("WishlistContext wishlist: ", state);

	useEffect(() => {
		const fetchWishlist = async () => {
			if (!user) return;
			const response = await wishlistApi.get("/", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			if (response.data) {
				const { wishlist } = response.data;
				const newWishlist = [...wishlist].map((item) => {
					const { product, addedAt } = item;
					const newAddedAt = addedAtToDateISOString(addedAt);
					return { product, addedAt: newAddedAt };
				});
				dispatch({ type: "SET", payload: newWishlist });
			}
		};

		fetchWishlist();
	}, [user]);

	return (
		<WishlistContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WishlistContext.Provider>
	);
};
