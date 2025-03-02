import { createContext } from "react";
import { Product, ProductAction } from "./ProductProvider";

export type ProductState = {
	products: Product[];
};

type ProductContextType = {
	dispatch: React.Dispatch<ProductAction>;
} & ProductState;

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined
);

