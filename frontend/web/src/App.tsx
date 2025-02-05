import { createBrowserRouter, RouterProvider } from "react-router";

// Pages
import { Auth } from "./pages/auth/Auth";
import { ROUTES } from "./utils/constant";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { Shop } from "./pages/Shop";

// Layouts
import { RootLayout } from "./layouts/RootLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Shop />,
			},
			{
				path: ROUTES.HOME,
				element: <Shop />,
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
				path: ROUTES.SIGN_UP,
				element: <Auth isSignup={true} />,
			},
			{
				path: ROUTES.LOGIN,
				element: <Auth isSignup={false} />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
