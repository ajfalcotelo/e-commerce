import { useEffect, useReducer } from "react";
import { product } from "../api/product";
import { ProductContext, ProductState } from "./ProductContext";

export type Product = {
	_id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string[];
	rating: {
		count: number;
		rate: number;
	};
	createdAt: string;
	updatedAt: string;
};

export type ProductAction =
	| {
			type: "SET";
			payload: Product[];
	  }
	| {
			type: "GET" | "DISCONNECT";
	  };

const ProductReducer = (
	state: ProductState,
	action: ProductAction
): ProductState => {
	switch (action.type) {
		case "SET":
			return { products: action.payload };
		case "GET":
		default:
			return state;
	}
};

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(ProductReducer, { products: [] });

	console.log("ProductContext state: ", state);

	useEffect(() => {
		const getProducts = async () => {
			const getLocalProducts = localStorage.getItem("products");
			if (getLocalProducts) {
				dispatch({ type: "SET", payload: JSON.parse(getLocalProducts) });
				return;
			}

			const response = await product.get("/");
			const products = response.data.products;
			localStorage.setItem("products", JSON.stringify(products));
			dispatch({ type: "SET", payload: products });
		};

		getProducts();
	}, []);

	return (
		<ProductContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};
