import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

type CategoryProps = {
	className?: string;
	children: React.ReactNode;
	route: string;
};

// NEEDS BETTER DESIGN

export const Category = ({ children, route, className }: CategoryProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) => {
				return cn(
					{
						"hover:border-b-primary-black": !isActive,
					},
					"h-7 w-full justify-between border-y border-y-transparent select-none",
					{
						"border-b-primary-black": isActive,
					},
					className,
				);
			}}
		>
			{children}
		</NavLink>
	);
};
