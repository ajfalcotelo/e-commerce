import { CartTable } from "@/components/CartTable";
import { Checkout } from "@/components/Checkout";
import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { CartType } from "@/context/CartContext";
import { useCartContext } from "@/hooks/useCartContext";
import { ROUTES } from "@/utils/constant";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { useEffect, useState } from "react";

export const Cart = () => {
	const { products } = useCartContext();
	const [subtotal, setSubtotal] = useState<number>(0);

	useEffect(() => {
		const subtotalPrice = products.reduce(
			(acc: number, item: CartType) => item.product.price * item.count + acc,
			0,
		);
		setSubtotal(roundNumberByDecimalPlace(subtotalPrice, 2));
	}, [products]);

	return (
		<div className="mx-[16vw] my-20">
			{products.length > 0 ? (
				<div className="grid grid-cols-[2fr_1fr] items-start gap-x-8">
					<ScrollArea className="h-[440px] border border-black/30">
						<CartTable />
					</ScrollArea>
					<Checkout subtotal={subtotal} />
				</div>
			) : (
				<div className="flex flex-col items-center gap-8">
					<p className="w-full">
						No items here… yet! Find something you like and hit 'Add to Cart' to
						start your shopping journey.
					</p>
					<LinkButton
						route={ROUTES.HOME.ROOT}
						className="bg-secondary-cute-crab text-primary-white"
					>
						Go to home page
					</LinkButton>
				</div>
			)}
		</div>
	);
};
