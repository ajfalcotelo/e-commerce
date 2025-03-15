import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/shadcn/table";
import { useCart } from "@/hooks/useCart";
import { ProductType } from "@/context/ProductContext";
import { Input } from "@/components/ui/shadcn/input";
import { useCartContext } from "@/hooks/useCartContext";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CartType } from "@/context/CartContext";
import { LuX } from "react-icons/lu";

export const CartTable = ({ className, ...props }: { className?: string }) => {
	const { products, dispatch } = useCartContext();
	const { updateItem, removeItem } = useCart();
	const [count, setCount] = useState(1);
	const [product, setProduct] = useState<ProductType>();
	const debouncedCount = useDebounce(count);

	const handleInputChange = (product: ProductType, value: string) => {
		const regex = /[^0-9]+/g;
		const newValue = value.replace(regex, "");
		console.log(newValue);
		const newCount = Number(newValue);
		console.log(newCount);
		if (newValue === "") {
			setCount(0);
		} else {
			setCount(newCount);
		}
		setProduct(product);
		const productIndex = products.findIndex(
			(item) => item.product._id === product._id,
		);
		dispatch({
			type: "UPDATE_ITEM",
			payload: { product, count: newCount },
			index: productIndex,
		});
	};

	const handleInputBlur = (product: ProductType, value: string) => {
		const regex = /[\D]+/g;
		const newCount = Math.max(1, Number(value.replace(regex, "")));
		setCount(newCount);
		setProduct(product);
		const productIndex = products.findIndex(
			(item) => item.product._id === product._id,
		);
		dispatch({
			type: "UPDATE_ITEM",
			payload: { product, count: newCount },
			index: productIndex,
		});
	};

	const handleClickIncrement = ({ product, count }: CartType) => {
		const newCount = count + 1;
		setCount(newCount);
		setProduct(product);
		const productIndex = products.findIndex(
			(item) => item.product._id === product._id,
		);
		dispatch({
			type: "UPDATE_ITEM",
			payload: { product, count: newCount },
			index: productIndex,
		});
	};

	const handleClickDecrement = ({ product, count }: CartType) => {
		const newCount = Math.max(1, count - 1);
		setCount(newCount);
		setProduct(product);
		const productIndex = products.findIndex(
			(item) => item.product._id === product._id,
		);
		dispatch({
			type: "UPDATE_ITEM",
			payload: { product, count: newCount },
			index: productIndex,
		});
	};

	const handleClickRemove = ({ product, count }: CartType) => {
		removeItem({ product, count });
	};

	useEffect(() => {
		if (!product) return;
		updateItem({ product, count: debouncedCount });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedCount]);

	return (
		<Table className={className} {...props}>
			<TableHeader className="bg-secondary sticky top-0 z-20 select-none">
				<TableRow>
					<TableHead className="w-10"></TableHead>
					<TableHead className="w-3/6">Product</TableHead>
					<TableHead className="w-1/6 text-center">Price</TableHead>
					<TableHead className="w-1/6 text-center">Quantity</TableHead>
					<TableHead className="w-1/6 text-center">Subtotal</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products &&
					products.map((item) => {
						return (
							<TableRow key={item.product._id}>
								<TableCell>
									<Button
										variant="ghost"
										size="icon"
										className="group hover:bg-secondary-cute-crab size-6 cursor-pointer rounded-full p-1"
										onClick={() => {
											handleClickRemove(item);
										}}
									>
										<LuX className="group-hover:text-primary-white size-full transition-all" />
									</Button>
								</TableCell>
								<TableCell className="flex flex-row items-center gap-5">
									<div className="bg-primary-white flex size-14 items-center justify-center rounded-md">
										<img
											src={item.product.image[0]}
											className="max-h-12 max-w-12"
										/>
									</div>
									<p className="w-[324px] truncate">{item.product.title}</p>
								</TableCell>
								<TableCell className="text-center">
									<span>${item.product.price}</span>
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-center">
										<Button
											onClick={() => {
												handleClickDecrement(item);
											}}
											variant="outline"
											size="icon"
											className="rounded-r-none border-r-0"
										>
											<FaChevronLeft />
										</Button>
										<Input
											min={1}
											value={item.count === 0 ? "" : item.count}
											onChange={(e) =>
												handleInputChange(item.product, e.target.value)
											}
											onBlur={(e) =>
												handleInputBlur(item.product, e.target.value)
											}
											className="bg-primary-white z-10 w-full rounded-none"
										/>
										<Button
											onClick={() => {
												handleClickIncrement(item);
											}}
											variant="outline"
											size="icon"
											className="rounded-l-none border-l-0"
										>
											<FaChevronRight />
										</Button>
									</div>
								</TableCell>
								<TableCell className="text-center">
									<span>
										$
										{roundNumberByDecimalPlace(
											item.count * item.product.price,
											2,
										)}
									</span>
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
};
