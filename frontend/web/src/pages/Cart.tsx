import { CartTable } from "@/components/CartTable";
import { Checkout } from "@/components/Checkout";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { CartType } from "@/context/CartContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Cart = () => {
	const { user } = useAuthContext();
	const { products } = useCartContext();
	const [subtotal, setSubtotal] = useState<number>(0);
	const navigate = useNavigate();

	useEffect(() => {
		const subtotalPrice = products.reduce(
			(acc: number, item: CartType) => item.product.price * item.count + acc,
			0,
		);
		setSubtotal(roundNumberByDecimalPlace(subtotalPrice, 2));
	}, [products]);

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="mx-[16vw] my-20">
			<div className="grid grid-cols-[2fr_1fr] items-start gap-x-8">
				<ScrollArea className="h-[440px] border border-black/30">
					<CartTable />
				</ScrollArea>
				<Checkout subtotal={subtotal} className="" />
			</div>
		</div>
	);
};
