import { createContext } from "react";
import { ProductAction, Product } from "@/context/ProductProvider";

export type ProductState = {
	products: Product[];
};

type ProductContextType = {
	dispatch: React.Dispatch<ProductAction>;
} & ProductState;

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined,
);
