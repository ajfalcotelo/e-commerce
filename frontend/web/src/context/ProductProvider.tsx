import { useEffect, useMemo, useState } from "react";
import { ProductType, ProductContext } from "@/context/ProductContext";
import { api } from "@/services/api";

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loaded, setLoaded] = useState(false);

	const productMemo = useMemo(() => ({ products, setProducts }), [products]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const cachedProduct = localStorage.getItem("products");

				if (cachedProduct === "undefined") {
					localStorage.removeItem("products");
				}

				const cachedProductParsed: ProductType[] | null = cachedProduct
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
					setLoaded(true);
					return;
				}

				// Refreshes localStorage after cachedDuration
				console.log("ProductContext download data");
				const response = await api.get("/products");
				localStorage.setItem("products", JSON.stringify(response.data));
				localStorage.setItem("productsTimestamp", now.toString());
				setProducts(response.data);
				setLoaded(true);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	console.log("ProductContext products: ", productMemo.products);

	return (
		<ProductContext.Provider value={{ products: productMemo.products, loaded }}>
			{children}
		</ProductContext.Provider>
	);
};
