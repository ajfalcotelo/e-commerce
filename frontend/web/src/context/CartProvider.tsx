import { api } from "@/services/api";
import { CartContext, CartState, CartType } from "@/context/CartContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useReducer } from "react";
import { fetchProductBaseUrl } from "@/utils/api";
import { Products } from "@/types";

export type CartAction =
	| {
			type: "ADD";
			payload: CartType;
	  }
	| {
			type: "SET";
			payload: CartType[];
	  }
	| {
			type: "UPDATE_ITEM";
			payload: CartType;
			index: number;
	  }
	| {
			type: "REMOVE_ITEM";
			payload: CartType;
	  }
	| {
			type: "DELETE";
	  };

const CartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "ADD":
			return { products: [action.payload, ...state.products] };
		case "SET":
			return { products: action.payload };
		case "UPDATE_ITEM":
			return {
				products: [
					...state.products.slice(0, action.index),
					action.payload,
					...state.products.slice(action.index + 1),
				],
			};
		case "REMOVE_ITEM":
			return {
				products: [
					...state.products.filter(
						(item) => item.product != action.payload.product,
					),
				],
			};
		case "DELETE":
			return { products: [] };
		default:
			return state;
	}
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(CartReducer, { products: [] });
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchCart = async () => {
			if (!user) return;
			const dbResponse = await api.get("/cart", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			const dbProducts: { product_id: number; count: number }[] =
				dbResponse.data.products;
			const apiResponse = await Promise.allSettled(
				dbProducts.map(async (item) => {
					const data = await fetchProductBaseUrl<Products>(
						`/${item.product_id}`,
					);
					return { product: data, count: item.count };
				}),
			);

			apiResponse.forEach((item, index) => {
				if (item.status === "fulfilled") {
					dispatch({
						type: "ADD",
						payload: { product: item.value.product, count: item.value.count },
					});
				} else {
					console.error(
						`Cart API Fetch ${index} Error ${item.status}: ${item.reason}`,
					);
				}
			});

			console.log("test");
		};

		fetchCart();
	}, [user]);

	return (
		<CartContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
