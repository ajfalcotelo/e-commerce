import { NavLink } from "react-router";
import { cn } from "../../utils/cn";

type CategoryProps = {
	className?: string;
	children: React.ReactNode;
	route: string;
};

// NEEDS BETTER DESIGN

const Category = ({ children, route, className }: CategoryProps) => {
	return (
		<NavLink
			to={route}
			className={({ isActive }) => {
				return cn(
					{
						"hover:border-b-primary-black ": !isActive,
					},
					"w-full h-7 justify-between border-y border-y-transparent select-none",
					{
						"border-b-primary-black ": isActive,
					},
					className
				);
			}}
		>
			{children}
		</NavLink>
	);
};

export default Category;
