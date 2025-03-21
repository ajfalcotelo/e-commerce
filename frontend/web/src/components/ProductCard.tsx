import { StarRating } from "@/components/ui/StarRating";
import { ProductType } from "@/context/ProductContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export const PRODUCT_CARD_WIDTH = 270;

type ProductCardProps = {
	product: ProductType;
	showRatings?: boolean;
	actionButtons?: React.ReactElement;
	alwaysShowCartButton?: boolean;
	hoverHighlight?: boolean;
};

export const ProductCard = ({
	product,
	showRatings = true,
	actionButtons,
	alwaysShowCartButton = false,
	hoverHighlight = true,
}: ProductCardProps) => {
	const { title, image, rating, discountRate: discount } = product;
	const { user } = useAuthContext();
	const { addItem } = useCart();
	let { price } = product;

	const oldPrice = discount ? price : null;

	if (discount) {
		const discountedPrice = price - price * (discount / 100);
		price = roundNumberByDecimalPlace(discountedPrice, 2);
	}

	const handleAddToCartClick = () => {
		if (user) {
			addItem({ product, count: 1 });
			toast.success("Item has been added to cart", {
				duration: 3000,
				classNames: {
					toast: "!select-none !border !border-black/30",
				},
			});
		}
	};

	return (
		<div
			className={cn("group flex-shrink-0 border border-black/30", {
				"hover:-translate-y-0.5 hover:shadow-[0px_0px_7px_0px] hover:shadow-black/30":
					hoverHighlight,
			})}
			style={{ width: `${PRODUCT_CARD_WIDTH}px` }}
		>
			<div
				className="bg-primary-white relative flex h-60 w-full items-center justify-center rounded
					rounded-b-none"
			>
				<img
					src={image[0]}
					alt="An image showcasing the product"
					className="max-h-40 max-w-40 rounded-lg select-none"
				/>
				{discount && (
					<div
						className="bg-secondary-cute-crab text-primary-white absolute top-3 left-3 flex h-6 w-14
							items-center justify-center rounded px-3 py-1 text-sm select-none"
					>
						-{discount}%
					</div>
				)}
				<div className="absolute top-3 right-3 flex flex-col gap-3">
					{actionButtons}
				</div>
				<button
					className={cn(
						`text-primary-white border-battle-grey absolute bottom-0 box-content flex w-full
						cursor-pointer appearance-none flex-row items-center justify-center gap-2
						overflow-hidden border-x bg-black transition-all select-none`,
						{
							"h-0 group-hover:h-10": !alwaysShowCartButton,
							"h-10": alwaysShowCartButton,
						},
					)}
					onClick={handleAddToCartClick}
				>
					<ShoppingCart />
					<p className="text-sm">Add to cart</p>
				</button>
			</div>
			<div className="bg-secondary-white-smoke w-full space-y-2 p-2">
				<p className="h-6 truncate font-medium">{title}</p>
				<div className="space-x-3 font-medium">
					<span className="text-secondary-cute-crab">${price}</span>
					{discount && (
						<span className="text-battle-grey line-through">${oldPrice}</span>
					)}
				</div>
				{showRatings && (
					<div className="flex flex-row items-center gap-2 select-none">
						<StarRating rate={rating.rate} className="size-5" />
						<span className="text-battle-grey text-sm font-semibold">
							({rating.count})
						</span>
					</div>
				)}
			</div>
		</div>
	);
};
