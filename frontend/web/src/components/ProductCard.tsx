import { StarRating } from "@/components/ui/StarRating";
import { Product } from "@/context/ProductContext";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { FaRegEye, FaRegHeart } from "react-icons/fa6";

type ProductCardProps = {
	product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
	const { title, image, rating, discount } = product;
	let { price } = product;

	const oldPrice = discount ? price : null;

	if (discount) {
		const discountedPrice = price - price * (discount / 100);
		price = roundNumberByDecimalPlace(discountedPrice, 2);
	}

	return (
		<div
			className="group w-[270px] flex-shrink-0 border border-black/30
				hover:shadow-[0px_0px_7px_0px] hover:shadow-black/30"
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
					<button
						className="bg-secondary-white-smoke flex size-8 cursor-pointer appearance-none items-center
							justify-center rounded-full"
					>
						<FaRegHeart />
					</button>
					<button
						className="bg-secondary-white-smoke flex size-8 cursor-pointer appearance-none items-center
							justify-center rounded-full"
					>
						<FaRegEye />
					</button>
				</div>
				<button
					className="text-primary-white absolute bottom-0 h-0 w-full cursor-pointer appearance-none
						overflow-hidden bg-black font-medium transition-all select-none group-hover:h-10"
				>
					Add to cart
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
				<div className="flex flex-row items-center gap-2 select-none">
					<StarRating rate={rating.rate} className="size-5" />
					<span className="text-battle-grey text-sm font-semibold">
						({rating.count})
					</span>
				</div>
			</div>
		</div>
	);
};
