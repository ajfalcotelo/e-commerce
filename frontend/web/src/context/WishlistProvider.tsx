import {
	addedAtToDateISOString,
	DateISOString,
	WishlistContext,
	WishlistState,
	WishlistType,
} from "@/context/WishlistContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { Products } from "@/types";
import { fetchProductBaseUrl } from "@/utils/api";
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
			payload: Products;
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
						(item) => item.product.id != action.payload.id,
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
			const dbResponse = await api.get("/wishlist", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			const dbProducts: { product_id: number; addedAt: DateISOString }[] =
				dbResponse.data.wishlist;

			console.log(dbResponse);

			const apiResponse = await Promise.allSettled(
				dbProducts.map(async (item) => {
					const data = await fetchProductBaseUrl<Products>(
						`/${item.product_id}`,
					);
					return { product: data, addedAt: item.addedAt };
				}),
			);

			apiResponse.forEach((item, index) => {
				if (item.status === "fulfilled") {
					dispatch({
						type: "ADD",
						payload: {
							product: item.value.product,
							addedAt: addedAtToDateISOString(item.value.addedAt),
						},
					});
				} else {
					console.error(
						`Cart API Fetch ${index} Error ${item.status}: ${item.reason}`,
					);
				}
			});
		};

		fetchWishlist();
	}, [user]);

	return (
		<WishlistContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WishlistContext.Provider>
	);
};
