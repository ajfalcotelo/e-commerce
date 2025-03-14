import { CartTable } from "@/components/CartTable";
import { Checkout } from "@/components/Checkout";
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
			<div className="grid grid-flow-col gap-x-8">
				<CartTable />
				<Checkout subtotal={subtotal} className="border border-black/30" />
			</div>
		</div>
	);
};
