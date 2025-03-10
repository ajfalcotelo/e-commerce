import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import { ROUTES } from "@/utils/constant";
import { Contacts } from "@/pages/Contacts";
import { About } from "@/pages/About";
import { Shop } from "@/pages/Shop";
import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

// Layouts
import { RootLayout } from "@/layouts/RootLayout";
import { AuthLayout } from "@/layouts/AuthLayout";

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: ROUTES.SHOP.ROOT,
				element: <Shop />,
				children: [
					{
						path: ROUTES.SHOP.WOMEN,
						element: <Shop />,
					},
					{
						path: ROUTES.SHOP.MEN,
						element: <Shop />,
					},
					{
						path: ROUTES.SHOP.ELECTRONICS,
						element: <Shop />,
					},
					{
						path: ROUTES.SHOP.JEWELRY,
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
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export const App = () => {
	return <RouterProvider router={router} />;
};
