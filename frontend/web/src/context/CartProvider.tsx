import { cartApi } from "@/api/cart";
import { CartContext, CartState, CartType } from "@/context/CartContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useReducer } from "react";

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
						(item) => item.product._id != action.payload.product._id,
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

	console.log("CartContext cart: ", state);

	useEffect(() => {
		const fetchCart = async () => {
			if (!user) return;
			const response = await cartApi.get("/", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			if (response.data) {
				dispatch({ type: "SET", payload: response.data.products });
			}
		};

		fetchCart();
	}, [user]);

	return (
		<CartContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
