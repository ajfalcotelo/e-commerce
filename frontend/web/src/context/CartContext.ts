import { CartAction } from "@/context/CartProvider";
import { ProductType } from "@/context/ProductContext";
import { createContext } from "react";

export type CartType = {
	product: ProductType;
	count: number;
};
export type CartState = {
	products: CartType[];
};

type CartContextType = {
	dispatch: React.Dispatch<CartAction>;
} & CartState;

export const CartContext = createContext<CartContextType | undefined>(
	undefined,
);
