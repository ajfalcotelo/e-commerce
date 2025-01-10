import { Outlet } from "react-router";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";

export const RootLayout = () => {
	return (
		<div className="overflow-x-hidden">
			<div className="h-screen w-full">
				<Banner />
				<Header />
				<main className="w-full">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
};
