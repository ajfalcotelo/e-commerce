import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/App";

import "./index.css";
import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import { WishlistProvider } from "@/context/WishlistProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<WishlistProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</WishlistProvider>
		</AuthProvider>
	</StrictMode>,
);
