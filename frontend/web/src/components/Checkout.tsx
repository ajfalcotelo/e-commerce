import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CheckoutType = {
	className?: string;
	subtotal: number;
};

export const Checkout = ({ subtotal, className, ...props }: CheckoutType) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-5 border border-black/30 px-6 py-8",
				className,
			)}
			{...props}
		>
			<p className="w-full text-left text-xl font-semibold">Cart Total</p>
			<div className="grid w-full grid-flow-row divide-y divide-black">
				<div className="flex justify-between py-2">
					<span>Subtotal:</span>
					<span>${subtotal}</span>
				</div>
				<div className="flex justify-between py-2">
					<span>Total:</span>
					<span>${subtotal}</span>
				</div>
			</div>
			<Button variant="red" className="w-64">
				Proceed to checkout
			</Button>
		</div>
	);
};
