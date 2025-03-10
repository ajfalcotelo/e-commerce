import { LinkButton } from "@/components/ui/LinkButton";
import { ROUTES } from "@/utils/constant";

export const NotFound = () => {
	return (
		<div className="mx-auto my-10 flex h-[70vh] w-8/12 flex-col items-center justify-center gap-8">
			<h2 className="text-7xl">404 Not Found</h2>
			<p>Your visited page does not exist. You may go to the Home page.</p>
			<LinkButton route={ROUTES.SHOP.ROOT}>Back to home page</LinkButton>
		</div>
	);
};
