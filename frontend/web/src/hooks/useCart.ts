import { cart } from "@/api/cart";
import { CartType } from "@/context/CartContext";
import { ProductType } from "@/context/ProductContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { useState } from "react";

export const useCart = () => {
	const { products, dispatch } = useCartContext();
	const { user } = useAuthContext();
	const [error, setError] = useState<string | null>(null);

	const createCart = async (
		initialProduct: ProductType,
		initialProductCount: number,
	) => {
		if (!user) return;
		const userCart = await cart.get("/", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		if (!userCart.data) {
			dispatch({
				type: "SET",
				payload: [{ product: initialProduct, count: initialProductCount }],
			});
			await cart.post(
				"/",
				{ products: [{ product: initialProduct, count: initialProductCount }] },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			);
			console.log("Cart Data Created");
		}
	};

	const removeItem = async ({ product, count }: CartType) => {
		if (!user) return;
		const userCart = await cart.get("/", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		if (!userCart.data) return;

		const newProducts = [...products].filter(
			(item) => item.product._id != product._id,
		);

		dispatch({ type: "REMOVE_ITEM", payload: { product, count } });
		await cart.patch(
			"/",
			{ products: newProducts },
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			},
		);
	};

	const addItem = async ({ product, count }: CartType) => {
		if (!user) return;
		const userCart = await cart.get("/", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		if (!userCart.data) {
			console.log("user does not have cart, will now create");
			createCart(product, count);
		}

		// if product already exists, will only add count
		// if product does not exist, will add to cart
		if (products.some((e: CartType) => e.product._id === product._id)) {
			console.log("product already exists, will only add count");
			const newProducts = [...products].map((item) => {
				if (item.product._id === product._id) {
					const newCount = item.count + 1;
					return { product, count: newCount };
				} else {
					return item;
				}
			});

			dispatch({ type: "SET", payload: [...newProducts] });
			await cart.patch(
				"/",
				{ products: [...newProducts] },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			);
		} else {
			console.log("product does not exist, will add to cart");
			dispatch({ type: "ADD", payload: { product, count } });
			await cart.patch(
				"/",
				{ products: [...products, { product, count }] },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			);
		}
	};

	const deleteCart = async () => {
		if (!user) return;
		console.log("Cart Data Deleted");
		dispatch({ type: "DELETE" });
		const response = await cart.delete("/", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		console.log(response.data);
	};

	const updateItem = async ({ product, count }: CartType) => {
		if (!user) return;
		const userCart = await cart.get("/", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		if (userCart.data) {
			if (products.some((item) => item.product._id === product._id)) {
				const newProducts = [...products].map((item) => {
					if (item.product._id === product._id) {
						return { product, count };
					} else {
						return item;
					}
				});

				dispatch({ type: "SET", payload: [...newProducts] });

				await cart.patch(
					"/",
					{ products: [...newProducts] },
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
			} else {
				setError("Item does not exist on cart");
				console.log("Item must be included in cart to update");
			}
		}
	};

	return {
		createCart,
		removeItem,
		addItem,
		deleteCart,
		updateItem,
		error,
	};
};
