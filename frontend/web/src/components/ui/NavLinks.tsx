import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router";

type NavLinkProps = {
	route: string;
	className?: string;
	children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavLinks = ({
	route,
	className,
	children,
	...props
}: NavLinkProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) =>
				isActive
					? cn(
							"border-t-2 border-b-2 border-b-black border-t-transparent border-opacity-50 text-sm font-medium inline-flex items-center text-center py-1"
					  )
					: "text-sm font-medium inline-flex items-center text-center py-1"
			}
			{...props}
		>
			{children}
		</NavLink>
	);
};
