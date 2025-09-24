import { DateISOString, toDateISOString } from "@/context/WishlistContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { api } from "@/services/api";
import { Products } from "@/types";
import { useState } from "react";

type WishlistAuthRequestType =
	| {
			method: "get" | "delete";
			body?: never;
	  }
	| {
			method: "patch" | "post";
			body: {
				wishlist: {
					product_id: number;
					addedAt: DateISOString;
				}[];
			};
	  };

export const useWishlist = () => {
	const { wishlist, dispatch: wishlistDispatch } = useWishlistContext();
	const { user } = useAuthContext();
	const [error, setError] = useState<string | null>(null);

	const authorizedRequest = async ({
		method,
		body,
	}: WishlistAuthRequestType) => {
		if (!user) return;
		switch (method) {
			case "get":
			case "delete": {
				try {
					const response = await api[method]("/wishlist", {
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					});
					return response.data;
				} catch (error) {
					console.error(error);
					setError((error as { error: string }).error);
					return;
				}
			}
			case "post":
			case "patch": {
				try {
					const response = await api[method]("/wishlist", body, {
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					});
					return response.data;
				} catch (error) {
					console.error(error);
					setError((error as { error: string }).error);
					return;
				}
			}
			default:
				throw new Error("Invalid request method");
		}
	};

	const createWishlist = async (initialProduct: Products) => {
		const userWishlistData = await authorizedRequest({ method: "get" });
		if (userWishlistData) console.log("Wishlist Data Already Exists");
		wishlistDispatch({
			type: "SET",
			payload: [
				{
					product: initialProduct,
					addedAt: toDateISOString(new Date(Date.now())),
				},
			],
		});
		const response = await authorizedRequest({
			method: "post",
			body: {
				wishlist: [
					{
						product_id: initialProduct.id,
						addedAt: toDateISOString(new Date(Date.now())),
					},
				],
			},
		});
		console.log(response);
		console.log("wishlist created");
	};

	const addItem = async (product: Products) => {
		const userWishlistData = await authorizedRequest({ method: "get" });
		if (!userWishlistData) {
			console.log("user does not have wishlist, will now create");
			createWishlist(product);
		}

		if (!wishlist.some((item) => item.product.id === product.id)) {
			wishlistDispatch({
				type: "ADD",
				payload: { product, addedAt: toDateISOString(new Date(Date.now())) },
			});
			await authorizedRequest({
				method: "patch",
				body: {
					wishlist: [
						...[...wishlist].map((item) => ({
							product_id: item.product.id,
							addedAt: item.addedAt,
						})),
						{
							product_id: product.id,
							addedAt: toDateISOString(new Date(Date.now())),
						},
					],
				},
			});
		}
	};

	const removeItem = async (product: Products) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) return;

		wishlistDispatch({ type: "REMOVE_ITEM", payload: { ...product } });
		await authorizedRequest({
			method: "patch",
			body: {
				wishlist: [...wishlist]
					.filter((item) => item.product.id != product.id)
					.map((item) => ({ product_id: product.id, addedAt: item.addedAt })),
			},
		});
	};

	const deleteWishlist = async () => {
		const responseData = await authorizedRequest({ method: "delete" });
		if (!responseData) return;
		wishlistDispatch({ type: "DELETE" });
		console.log("wishlist deleted");
	};

	return { createWishlist, addItem, removeItem, deleteWishlist, error };
};
