import { cn } from "../utils/cn";
import { ROUTES } from "../utils/constant";
import Category from "./ui/Category";

type CategoriesProps = {
	className?: string;
};

const Categories = ({ className }: CategoriesProps) => {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(autofit,minmax(2rem, 1fr)] place-items-center",
				className
			)}
		>
			<Category route={ROUTES.HOME.WOMEN}>Women's Clothing</Category>
			<Category route={ROUTES.HOME.MEN}>Men's Clothing</Category>
			<Category route={ROUTES.HOME.ELECTRONICS}>Electronics</Category>
			<Category route={ROUTES.HOME.JEWELRY}>Jewelry</Category>
		</div>
	);
};

export default Categories;
