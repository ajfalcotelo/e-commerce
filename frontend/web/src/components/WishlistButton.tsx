import { useAuthContext } from "@/hooks/useAuthContext";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constant";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router";
import { toast } from "sonner";

export const WishlistButton = ({
	className,
	...props
}: {
	className?: string;
}) => {
	const { wishlist } = useWishlistContext();
	const { user } = useAuthContext();

	const handleOnClick = () => {
		if (!user) {
			toast.error("You must be logged in to visit this page");
		}
	};

	const Comp = user ? Link : "button";

	return (
		<Comp
			to={ROUTES.HOME.WISHLIST}
			className={cn(
				"relative flex size-8 cursor-pointer items-center justify-center",
				className,
			)}
			onClick={handleOnClick}
			{...props}
		>
			<FaRegHeart className="size-10/12" />
			{wishlist.length > 0 && (
				<div
					className="bg-secondary-cute-crab text-primary-white absolute top-0 right-0 flex h-6/12
						translate-x-1.5 items-center justify-center rounded-full p-1 text-xs"
				>
					{wishlist.length > 9 ? "9+" : wishlist.length}
				</div>
			)}
		</Comp>
	);
};
