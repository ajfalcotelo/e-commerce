import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router";

type NavLinkProps = {
	route: string;
	className?: string;
	children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Nav = ({ route, className, children, ...props }: NavLinkProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) => isActive ? cn("border-b-2 border-black border-opacity-50 text-sm font-medium inline-flex items-center text-center py-1") : "text-sm font-medium inline-flex items-center text-center py-1"}
			{...props}
		>
			{children}
		</NavLink>
	);
};
