import { ProductType } from "@/context/ProductContext";
import { WishlistAction } from "@/context/WishlistProvider";
import { createContext } from "react";

export type DateISOString = string & { readonly __brand: "DateISOString" };

export const toDateISOString = (value: Date): DateISOString => {
	return value.toISOString() as DateISOString;
};

export const addedAtToDateISOString = (value: string): DateISOString => {
	return value as DateISOString;
};

export type WishlistType = {
	product: ProductType;
	addedAt: DateISOString;
};

export type WishlistState = {
	wishlist: WishlistType[];
};

type WishlistContextType = {
	dispatch: React.Dispatch<WishlistAction>;
} & WishlistState;

export const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined,
);
