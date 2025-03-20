import { CardActionButton } from "@/components/ui/CardActionButton";
import { ProductType } from "@/context/ProductContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

export const RemoveWishlistCardAction = ({
	product,
}: {
	product: ProductType;
}) => {
	const { removeItem } = useWishlist();
	const { dispatch } = useWishlistContext();

	const handleOnClick = () => {
		dispatch({ type: "REMOVE_ITEM", payload: product });
		removeItem(product);
		toast("Item has been removed from your wishlist", {
			duration: 3000,
			classNames: {
				toast: "!select-none !border !border-black/30",
			},
			icon: <FaRegTrashCan className="text-secondary-cute-crab size-4" />,
		});
	};

	return (
		<CardActionButton onClick={handleOnClick} className="">
			<FaRegTrashCan />
		</CardActionButton>
	);
};
