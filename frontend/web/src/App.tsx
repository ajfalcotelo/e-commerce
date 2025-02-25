import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import { ROUTES } from "./utils/constant";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";

// Layouts
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";

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
						element: <SignUp />,
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

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
