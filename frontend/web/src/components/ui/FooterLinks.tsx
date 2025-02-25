import { Link } from "react-router";

type FooterLinksProps = {
	children: React.ReactNode;
	route: string;
};
export const FooterLink = ({ children, route }: FooterLinksProps) => {
	return (
		<Link to={route} className="transition-all hover:underline">
			{children}
		</Link>
	);
};
