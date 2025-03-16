import { Outlet } from "react-router";

// Components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { Toaster } from "@/components/ui/shadcn/sonner";

export const RootLayout = () => {
	return (
		<div className="bg-primary-white relative min-h-screen overflow-x-hidden">
			<div className="w-screen pb-[32rem]">
				<Banner />
				<Header />
				<main className="w-full">
					<Outlet />
					<Toaster expand={true} />
				</main>
			</div>
			<Footer className="absolute bottom-0" />
		</div>
	);
};
