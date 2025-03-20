import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import { ROUTES } from "@/utils/constant";
import { Contacts } from "@/pages/Contacts";
import { About } from "@/pages/About";
import { Shop } from "@/pages/Shop";
import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Cart } from "@/pages/Cart";

// Layouts
import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Wishlist } from "@/pages/Wishlist";

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: ROUTES.HOME.ROOT,
				element: <Shop />,
				children: [
					{
						path: ROUTES.HOME.WOMEN,
						element: <Shop />,
					},
					{
						path: ROUTES.HOME.MEN,
						element: <Shop />,
					},
					{
						path: ROUTES.HOME.ELECTRONICS,
						element: <Shop />,
					},
					{
						path: ROUTES.HOME.JEWELRY,
						element: <Shop />,
					},
				],
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: ROUTES.AUTH.LOGIN,
						element: <Login />,
					},
					{
						path: ROUTES.AUTH.SIGNUP,
						element: <Signup />,
					},
				],
			},
			{
				path: ROUTES.CONTACT,
				element: <Contacts />,
			},
			{
				path: ROUTES.ABOUT,
				element: <About />,
			},
			{
				path: ROUTES.HOME.CART,
				element: <Cart />,
			},
			{
				path: ROUTES.HOME.WISHLIST,
				element: <Wishlist />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export const App = () => {
	return <RouterProvider router={router} />;
};
