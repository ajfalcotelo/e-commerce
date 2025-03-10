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
			<Category route={ROUTES.SHOP.WOMEN}>Women's Fashion</Category>
			<Category route={ROUTES.SHOP.MEN}>Men's Fashion</Category>
			<Category route={ROUTES.SHOP.ELECTRONICS}>Electronics</Category>
			<Category route={ROUTES.SHOP.FURNITURE}>Furniture</Category>
			<Category route={ROUTES.SHOP.SPORTS}>Sports</Category>
			<Category route={ROUTES.SHOP.BEAUTY}>Beauty</Category>
			<Category route={ROUTES.SHOP.JEWELRY}>Jewelry</Category>
		</div>
	);
};
