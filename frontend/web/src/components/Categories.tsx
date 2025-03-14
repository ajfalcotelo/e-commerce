import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constant";
import { Category } from "@/components/ui/Category";

type CategoriesProps = {
	className?: string;
};

export const Categories = ({ className }: CategoriesProps) => {
	return (
		<div
			className={cn(
				"grid-cols-[repeat(autofit,minmax(2rem, 1fr)] grid place-items-center",
				className,
			)}
		>
			<Category route={ROUTES.HOME.WOMEN}>Women's Fashion</Category>
			<Category route={ROUTES.HOME.MEN}>Men's Fashion</Category>
			<Category route={ROUTES.HOME.ELECTRONICS}>Electronics</Category>
			<Category route={ROUTES.HOME.FURNITURE}>Furniture</Category>
			<Category route={ROUTES.HOME.SPORTS}>Sports</Category>
			<Category route={ROUTES.HOME.BEAUTY}>Beauty</Category>
			<Category route={ROUTES.HOME.JEWELRY}>Jewelry</Category>
		</div>
	);
};
