import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router";

// Pages
import { Auth } from "./pages/auth/Auth";
import { ROUTES } from "./utils/constant";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { Shop } from "./pages/Shop";

// Layouts
import { RootLayout } from "./layouts/RootLayout";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Shop />} />
			<Route path={ROUTES.HOME} element={<Shop />} />
			<Route path={ROUTES.CONTACT} element={<Contacts />} />
			<Route path={ROUTES.ABOUT} element={<About />} />
			<Route path={ROUTES.SIGN_UP} element={<Auth isSignup={true} />} />
			<Route path={ROUTES.LOGIN} element={<Auth isSignup={false} />} />
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
