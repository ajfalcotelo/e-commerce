import { createContext } from "react";

export type ProductType = {
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
	products: ProductType[];
	setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

export const ProductContext = createContext<ProductContextType | undefined>(
	undefined,
);
