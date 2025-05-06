import { createContext } from "react";

export type ProductType = {
	_id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string[];
	discountRate: number;
	stock: number;
	rating: {
		count: number;
		rate: number;
	};
	createdAt: string;
	updatedAt: string;
};

type ProductContextType = {
	products: ProductType[];
	loaded: boolean;
};

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined,
);
