import { cart } from "@/api/cart";
import { CartType } from "@/context/CartContext";
import { ProductType } from "@/context/ProductContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { useState } from "react";

type AuthorizedRequestType =
	| {
			method: "get" | "delete";
			body?: never;
	  }
	| {
			method: "patch" | "post";
			body: object;
	  };

export const useCart = () => {
	const { products, dispatch } = useCartContext();
	const { user } = useAuthContext();
	const [error, setError] = useState<string | null>(null);

	const authorizedRequest = async ({ method, body }: AuthorizedRequestType) => {
		if (!user) return;
		switch (method) {
			case "get":
			case "delete": {
				try {
					const response = await cart[method]("/", {
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
					const response = await cart[method]("/", body, {
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
		if (!userCartData) return;
		dispatch({ type: "SET", payload: userCartData });
	};

	const createCart = async (
		initialProduct: ProductType,
		initialProductCount: number,
	) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (userCartData) console.log("Cart Data Already Exists");
		dispatch({
			type: "SET",
			payload: [{ product: initialProduct, count: initialProductCount }],
		});
		await authorizedRequest({
			method: "post",
			body: {
				products: [{ product: initialProduct, count: initialProductCount }],
			},
		});
		console.log("cart created");
	};

	const removeItem = async ({ product }: CartType) => {
		const userCartData = await authorizedRequest({ method: "get" });

		if (!userCartData) return;

		const newProducts = [...products].filter(
			(item) => item.product._id != product._id,
		);

		await authorizedRequest({
			method: "patch",
			body: { products: newProducts },
		});
		console.log("item removed");
	};

	const addItem = async ({ product, count }: CartType) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) {
			console.log("user does not have cart, will now create");
			createCart(product, count);
		}

		if (product.stock < count) {
			console.log("Cannot add more, no more stock");
			return;
		}

		// if product already exists, will only add count
		// if product does not exist, will add to cart
		if (products.some((item: CartType) => item.product._id === product._id)) {
			console.log("product already exists, will only add count");

			const productIndex = products.findIndex(
				(item) => item.product._id === product._id,
			);
			dispatch({
				type: "UPDATE_ITEM",
				payload: { product, count: products[productIndex].count + 1 },
				index: productIndex,
			});
			await updateItem({ product, count: products[productIndex].count + 1 });
		} else {
			console.log("product does not exist, will add to cart");
			dispatch({ type: "ADD", payload: { product, count } });
			await authorizedRequest({
				method: "patch",
				body: { products: [...products, { product, count }] },
			});
			console.log("item added");
		}
	};

	const deleteCart = async () => {
		const responseData = await authorizedRequest({ method: "delete" });
		if (!responseData) return;
		dispatch({ type: "DELETE" });
		console.log("cart deleted");
	};

	const updateItem = async ({ product, count }: CartType) => {
		const userCartData = await authorizedRequest({ method: "get" });
		if (!userCartData) return;

		const productIndex = products.findIndex(
			(item) => item.product._id === product._id,
		);

		await authorizedRequest({
			method: "patch",
			body: {
				products: [
					...products.slice(0, productIndex),
					{ product, count },
					...products.slice(productIndex + 1),
				],
			},
		});

		console.log("item updated");
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
