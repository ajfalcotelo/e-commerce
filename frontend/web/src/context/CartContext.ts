import { CartAction } from "@/context/CartProvider";
import { Products } from "@/types";
import { createContext } from "react";

export type CartType = {
	product: Products;
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
