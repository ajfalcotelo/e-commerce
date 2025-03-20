import { CardActionButton } from "@/components/ui/CardActionButton";
import { ProductType } from "@/context/ProductContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { ROUTES } from "@/utils/constant";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const WishlistCardAction = ({ product }: { product: ProductType }) => {
	const { wishlist } = useWishlistContext();
	const { addItem, removeItem } = useWishlist();
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const [toggleWishlist, setToggleWishlist] = useState(false);

	const handleOnClick = () => {
		if (!user) {
			navigate(ROUTES.AUTH.LOGIN);
			window.scrollTo(0, 0);
			return;
		}

		if (toggleWishlist) {
			setToggleWishlist(false);
			toast("Item has been removed from your wishlist", {
				duration: 3000,
				classNames: {
					toast: "!select-none !border !border-black/30",
				},
				icon: <FaRegTrashCan className="text-secondary-cute-crab size-4" />,
			});
			removeItem(product);
		} else {
			console.log("is not on wishlist, will add");
			setToggleWishlist(true);
			toast("Item has been added to your wishlist", {
				duration: 3000,
				classNames: {
					toast: "!select-none !border !border-black/30",
				},
				icon: <FaRegHeart className="text-buster-green size-4" />,
			});
			addItem(product);
		}
	};

	useEffect(() => {
		if (!user) return;
		if (wishlist.some((item) => item.product._id === product._id)) {
			setToggleWishlist(true);
		}
	}, [product, wishlist, user]);

	return (
		<CardActionButton onClick={handleOnClick}>
			{toggleWishlist ? (
				<FaHeart className="fill-candy-pink" />
			) : (
				<FaRegHeart />
			)}
		</CardActionButton>
	);
};
