import { PRODUCT_CARD_WIDTH, ProductCard } from "@/components/ProductCard";
import { RemoveWishlistCardAction } from "@/components/RemoveWishlistCardAction";
import { ShopSection } from "@/components/ShopSection";
import { LinkButton } from "@/components/ui/LinkButton";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogCancel,
} from "@/components/ui/shadcn/alert-dialog";
import { Button } from "@/components/ui/shadcn/button";
import { useCart } from "@/hooks/useCart";
import { useCartContext } from "@/hooks/useCartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { ROUTES } from "@/utils/constant";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export const Wishlist = () => {
	const { wishlist, dispatch: wishlistDispatch } = useWishlistContext();
	const { products } = useCartContext();
	const { addItem } = useCart();
	const { deleteWishlist } = useWishlist();

	const handleMoveAllToCart = () => {
		wishlist.forEach((wishlist) => {
			if (!products.some((cart) => cart.product._id === wishlist.product._id)) {
				const { product } = wishlist;
				addItem({ product, count: 1 });
			} else {
				console.log("WISHLIST - product is already in cart wont add");
			}
		});
	};

	const handleRemoveAll = () => {
		wishlistDispatch({ type: "DELETE" });
		deleteWishlist();
	};

	return (
		<div className="mx-[16vw]">
			<ShopSection
				title={
					<p className="text-xl font-semibold">Wishlist ({wishlist.length})</p>
				}
				actionButton={
					wishlist.length > 0 ? (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="outline"
									className="h-full rounded-xs border-black/30"
									onClick={handleMoveAllToCart}
								>
									Move All To Cart
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Do you wish to remove all items in your wishlist?
									</AlertDialogTitle>
									<AlertDialogDescription>
										All wishlist items have been{" "}
										<span className="text-buster-green">added</span> to your
										cart. Do you also want to remove them from your wishlist?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel className="cursor-pointer">
										No, keep them
									</AlertDialogCancel>
									<AlertDialogAction asChild>
										<Button
											variant="destructive"
											className="text-primary-white bg-secondary-cute-crab cursor-pointer"
											onClick={handleRemoveAll}
										>
											Yes, remove them
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					) : undefined
				}
			>
				{wishlist.length > 0 ? (
					<div
						className="grid w-full justify-center gap-2"
						style={{
							gridTemplateColumns: `repeat(auto-fill, ${PRODUCT_CARD_WIDTH}px)`,
						}}
					>
						{wishlist.map((item) => {
							return (
								<ProductCard
									key={item.product._id}
									product={item.product}
									actionButtons={
										<RemoveWishlistCardAction product={item.product} />
									}
									alwaysShowCartButton={true}
									showRatings={false}
									hoverHighlight={false}
								/>
							);
						})}
					</div>
				) : (
					<div className="flex flex-col items-center gap-8">
						<p className="w-full">
							Looks like your wishlist is empty! Browse our collection and tap
							the heart to save your must-haves here.
						</p>
						<LinkButton
							route={ROUTES.HOME.ROOT}
							className="bg-secondary-cute-crab text-primary-white"
						>
							Go to home page
						</LinkButton>
					</div>
				)}
			</ShopSection>
		</div>
	);
};
