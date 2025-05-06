import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constant";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export const CartButton = ({ className, ...props }: { className?: string }) => {
	const { products } = useCartContext();
	const { user } = useAuthContext();

	const handleOnClick = () => {
		if (!user) {
			toast.error("You must be logged in to visit this page");
		}
	};

	const Comp = user ? Link : "button";

	return (
		<Comp
			to={ROUTES.HOME.CART}
			className={cn(
				"relative flex size-8 cursor-pointer items-center justify-center",
				className,
			)}
			onClick={handleOnClick}
			{...props}
		>
			<ShoppingCart className="size-10/12" />
			{products.length > 0 && (
				<div
					className="bg-secondary-cute-crab text-primary-white absolute top-0 right-0 flex h-6/12
						translate-x-1.5 items-center justify-center rounded-full p-1 text-xs"
				>
					{products.length > 9 ? "9+" : products.length}
				</div>
			)}
		</Comp>
	);
};
