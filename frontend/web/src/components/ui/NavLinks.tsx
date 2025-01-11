import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router";
import { NAV } from "../../utils/constant";

type NavLinkProps = {
	route: string;
	className?: string;
	children: React.ReactNode;
	isLogo?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavLinks = ({
	route,
	className,
	children,
	isLogo = false,
	...props
}: NavLinkProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) =>
				cn(
					'text-sm font-medium inline-flex items-center text-center py-1',
					(isActive || location.pathname === '/' && route === NAV.HOME.ROUTE) && !isLogo ? 'border-t-2 border-b-2 border-t-transparent border-b-black border-opacity-50' : '',
					className
				)
			}
			{...props}
		>
			{children}
		</NavLink>
	);
};
