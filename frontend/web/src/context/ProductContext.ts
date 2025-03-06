import { createContext } from "react";

export type Product = {
	_id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string[];
	discount: number;
	rating: {
		count: number;
		rate: number;
	};
	createdAt: string;
	updatedAt: string;
};

type ProductContextType = {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined,
);
