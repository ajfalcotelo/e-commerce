import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import { ROUTES } from "@/utils/constant";
import { Contacts } from "@/pages/Contacts";
import { About } from "@/pages/About";
import { Shop } from "@/pages/Shop";
import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/auth/LogIn";
import { Signup } from "@/pages/auth/SignUp";
import { Cart } from "@/pages/Cart";

// Layouts
import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Wishlist } from "@/pages/Wishlist";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { Quickview } from "@/pages/Quickview";

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
				path: ROUTES.PRODUCTS,
				element: <Quickview />,
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
				element: (
					<ProtectedRoutes invert>
						<AuthLayout />
					</ProtectedRoutes>
				),
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
				path: ROUTES.HOME.CART,
				element: (
					<ProtectedRoutes>
						<Cart />
					</ProtectedRoutes>
				),
			},
			{
				path: ROUTES.HOME.WISHLIST,
				element: (
					<ProtectedRoutes>
						<Wishlist />
					</ProtectedRoutes>
				),
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
