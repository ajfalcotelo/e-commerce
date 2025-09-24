import { CartType } from "@/context/CartContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { api } from "@/services/api";
import { Products } from "@/types";
import { useState } from "react";

type CartAuthRequestType =
	| {
			method: "get" | "delete";
			body?: never;
	  }
	| {
			method: "patch" | "post";
			body: {
				products: {
					product_id: number;
					count: number;
				}[];
			};
	  };

export const useCart = () => {
	const { products: cartItems, dispatch: cartDispatch } = useCartContext();
	const { user } = useAuthContext();
	const [error, setError] = useState<string | null>(null);

	const authorizedRequest = async ({ method, body }: CartAuthRequestType) => {
		if (!user) return;
		switch (method) {
			case "get":
			case "delete": {
				try {
					const response = await api[method]("/cart", {
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
					const response = await api[method]("/cart", body, {
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

	const getCart = async () => {
		const userCartData = await authorizedRequest({ method: "get" });

		if (userCartData) {
			cartDispatch({ type: "SET", payload: userCartData });
		}
	};

	const createCart = async (
		initialProduct: Products,
		initialProductCount: number,
	) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (userCartData) console.log("Cart Data Already Exists");
		cartDispatch({
			type: "SET",
			payload: [{ product: initialProduct, count: initialProductCount }],
		});
		await authorizedRequest({
			method: "post",
			body: {
				products: [
					{ product_id: initialProduct.id, count: initialProductCount },
				],
			},
		});
	};

	const removeItem = async (productId: number) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) return;

		const newProducts = [...cartItems]
			.filter((item) => item.product.id != productId)
			.map((item) => ({ product_id: item.product.id, count: item.count }));

		await authorizedRequest({
			method: "patch",
			body: { products: newProducts },
		});
	};

	const addItem = async ({ product, count }: CartType) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) {
			console.log("user does not have cart, will now create");
			createCart(product, count);
		}

		if (product.stock < count) {
			return;
		}

		if (cartItems.some((item) => item.product.id === product.id)) {
			// if product already exists, will only add count

			const productIndex = cartItems.findIndex(
				(item) => item.product.id === product.id,
			);
			cartDispatch({
				type: "UPDATE_ITEM",
				payload: {
					product: product,
					count: cartItems[productIndex].count + 1,
				},
				index: productIndex,
			});
			await updateItem({ product, count: cartItems[productIndex].count + 1 });
		} else {
			// if product does not exist, will add to cart
			console.log("product does not exist, will add to cart");
			cartDispatch({ type: "ADD", payload: { product, count } });
			await authorizedRequest({
				method: "patch",
				body: {
					products: [
						...[...cartItems].map((item) => ({
							product_id: item.product.id,
							count: item.count,
						})),
						{ product_id: product.id, count },
					],
				},
			});
			console.log("item added");
		}
	};

	const updateItem = async ({ product, count }: CartType) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) return;

		const productIndex = cartItems.findIndex(
			(item) => item.product.id === product.id,
		);

		cartDispatch({
			type: "UPDATE_ITEM",
			payload: {
				product,
				count: cartItems[productIndex].count + 1,
			},
			index: productIndex,
		});

		await authorizedRequest({
			method: "patch",
			body: {
				products: [
					...cartItems.slice(0, productIndex).map((item) => ({
						product_id: item.product.id,
						count: item.count,
					})),
					{ product_id: product.id, count },
					...cartItems.slice(productIndex + 1).map((item) => ({
						product_id: item.product.id,
						count: item.count,
					})),
				],
			},
		});

		console.log("item updated");
	};

	const deleteCart = async () => {
		const responseData = await authorizedRequest({ method: "delete" });
		if (!responseData) return;
		cartDispatch({ type: "DELETE" });
		console.log("cart deleted");
	};

	return {
		getCart,
		createCart,
		removeItem,
		addItem,
		deleteCart,
		updateItem,
		error,
	};
};
