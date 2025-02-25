import { Outlet } from "react-router";

// Components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";

const RootLayout = () => {
	return (
		<div className="overflow-x-hidden relative min-h-screen bg-primary-white">
			<div className="w-screen pb-[32rem]">
				<Banner />
				<Header />
				<main className="w-full">
					<Outlet />
				</main>
			</div>
			<Footer className="absolute bottom-0" />
		</div>
	);
};

export default RootLayout;
