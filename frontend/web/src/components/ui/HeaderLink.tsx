import { AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router";
import { NAV } from "../../utils/constant";

type HeaderLinkProps = {
	route: string;
	className?: string;
	children: React.ReactNode;
	isLogo?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const HeaderLink = ({
	route,
	className,
	children,
	isLogo = false,
	...props
}: HeaderLinkProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) => {
				let activeClass = "";

				if (isActive) {
					activeClass =
						"border-y-2 border-t-transparent border-b-black border-opacity-50 py-2";

					if (location.pathname === "/" || route === NAV.HOME.ROUTE) {
						if (isLogo) {
							activeClass = "";
						}
					}
				}

				return cn(
					"text-base font-medium items-center text-center",
					activeClass,
					className
				);
			}}
			{...props}
		>
			{children}
		</NavLink>
	);
};
