import { wishlistApi } from "@/api/wishlistApi";
import { ProductType } from "@/context/ProductContext";
import { toDateISOString, WishlistType } from "@/context/WishlistContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { useState } from "react";

type WishlistAuthRequestType =
	| {
			method: "get" | "delete";
			body?: never;
	  }
	| {
			method: "patch" | "post";
			body: object;
	  };

export const useWishlist = () => {
	const { wishlist, dispatch } = useWishlistContext();
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
					const response = await wishlistApi[method]("/", {
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
					const response = await wishlistApi[method]("/", body, {
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

	const createWishlist = async (initialProduct: ProductType) => {
		const userWishlistData = await authorizedRequest({ method: "get" });
		if (userWishlistData) console.log("Wishlist Data Already Exists");
		dispatch({
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
						product: initialProduct,
						addedAt: toDateISOString(new Date(Date.now())),
					},
				],
			},
		});
		console.log(response);
		console.log("wishlist created");
	};

	const addItem = async (product: ProductType) => {
		const userWishlistData = await authorizedRequest({ method: "get" });
		if (!userWishlistData) {
			console.log("user does not have wishlist, will now create");
			createWishlist(product);
		}

		if (
			!wishlist.some((item: WishlistType) => item.product._id === product._id)
		) {
			dispatch({
				type: "ADD",
				payload: { product, addedAt: toDateISOString(new Date(Date.now())) },
			});
			await authorizedRequest({
				method: "patch",
				body: {
					wishlist: [
						...wishlist,
						{ product, addedAt: toDateISOString(new Date(Date.now())) },
					],
				},
			});
			console.log("item added");
		}
	};

	const removeItem = async (product: ProductType) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) return;

		dispatch({ type: "REMOVE_ITEM", payload: { ...product } });
		await authorizedRequest({
			method: "patch",
			body: {
				wishlist: [...wishlist].filter(
					(item) => item.product._id != product._id,
				),
			},
		});
		console.log("item removed");
	};

	const deleteWishlist = async () => {
		const responseData = await authorizedRequest({ method: "delete" });
		if (!responseData) return;
		dispatch({ type: "DELETE" });
		console.log("wishlist deleted");
	};

	return { createWishlist, addItem, removeItem, deleteWishlist, error };
};
