import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/App";

import "./index.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ProductProvider } from "@/context/ProductProvider";
import { CartProvider } from "@/context/CartProvider";
import { WishlistProvider } from "@/context/WishlistProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<ProductProvider>
				<WishlistProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</WishlistProvider>
			</ProductProvider>
		</AuthProvider>
	</StrictMode>,
);
