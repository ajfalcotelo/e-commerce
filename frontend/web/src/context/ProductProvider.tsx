import { useEffect, useMemo, useState } from "react";
import { product } from "@/api/product";
import { Product, ProductContext } from "@/context/ProductContext";

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products, setProducts] = useState<Product[]>([]);

	console.log("ProductContext products: ", products);

	const productMemo = useMemo(() => ({ products, setProducts }), [products]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const cachedProduct = localStorage.getItem("products");

				if (cachedProduct === "undefined") {
					localStorage.removeItem("products");
				}

				const cachedProductParsed: Product[] | null = cachedProduct
					? JSON.parse(cachedProduct)
					: null;
				const cachedTimestamp = Number(
					localStorage.getItem("productsTimestamp"),
				);

				const now = Date.now();
				const cacheDuration = 0.5 * 60 * 60 * 1000; // 30 mins

				// Use cachedProduct as state for as long as cachedDuration
				if (
					cachedProductParsed &&
					cachedTimestamp &&
					now - cachedTimestamp < cacheDuration
				) {
					console.log("ProductContext load cache");
					setProducts(cachedProductParsed);
					return;
				}

				// Refreshes localStorage after cachedDuration
				console.log("ProductContext download data");
				const response = await product.get("/");
				localStorage.setItem("products", JSON.stringify(response.data));
				localStorage.setItem("productsTimestamp", now.toString());
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider value={productMemo}>
			{children}
		</ProductContext.Provider>
	);
};
