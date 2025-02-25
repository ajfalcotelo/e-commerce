import LinkButton from "../components/ui/LinkButton";
import { ROUTES } from "../utils/constant";

const NotFound = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-8 mx-auto my-10 h-[70vh] w-8/12">
			<h2 className="text-7xl">404 Not Found</h2>
			<p>Your visited page does not exist. You may go to the Home page.</p>
			<LinkButton route={ROUTES.HOME.ROOT}>Back to home page</LinkButton>
		</div>
	);
};

export default NotFound;
