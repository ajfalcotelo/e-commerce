import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/shadcn/table";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/ui/shadcn/input";
import { useCartContext } from "@/hooks/useCartContext";
import { roundNumberByDecimalPlace } from "@/utils/roundNumber";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { CartType } from "@/context/CartContext";
import { Minus, Plus, X } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/shadcn/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/shadcn/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { Products } from "@/types";

export const CartTable = ({ className, ...props }: { className?: string }) => {
	const { products, dispatch: cartDispatch } = useCartContext();
	const { updateItem, removeItem, deleteCart } = useCart();
	const [count, setCount] = useState(1);
	const [product, setProduct] = useState<Products>();
	const debouncedCount = useDebounce(count, 800);

	const handleInputChange = (product: Products, value: string) => {
		const regex = /[^0-9]+/g;
		const newValue = value.replace(regex, "");
		const newCount = Number(newValue);
		if (newValue === "") {
			setCount(0);
		} else {
			setCount(newCount);
		}
		setProduct(product);
	};

	const handleInputBlur = (product: Products, value: string) => {
		const regex = /[\D]+/g;
		const newCount = Math.max(1, Number(value.replace(regex, "")));
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
		setProduct(product);
	};

	const handleClickIncrement = ({ product, count }: CartType) => {
		const newCount = count + 1;
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
		setProduct(product);
	};

	const handleClickDecrement = ({ product, count }: CartType) => {
		const newCount = Math.max(1, count - 1);
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
		setProduct(product);
	};

	const handleClickRemove = ({ product, count }: CartType) => {
		cartDispatch({ type: "REMOVE_ITEM", payload: { product, count } });
		removeItem(product.id);
	};

	const handleClickRemoveAll = () => {
		cartDispatch({ type: "DELETE" });
		deleteCart();
	};

	// DEBOUNCES DATABASE UPDATE
	useEffect(() => {
		if (!product) return;
		updateItem({ product, count: debouncedCount });
	}, [debouncedCount]);

	// UPDATES UI IMMEDIATELY
	useEffect(() => {
		if (!product) return;
		const productIndex = products.findIndex(
			(item) => item.product.id === product.id,
		);
		cartDispatch({
			type: "UPDATE_ITEM",
			payload: { product, count },
			index: productIndex,
		});
	}, [count]);

	return (
		<Table className={className} {...props}>
			<TableHeader className="bg-secondary sticky top-0 z-20 select-none">
				<TableRow>
					<TableHead>
						{products.length > 0 && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										size="icon"
										className="group hover:bg-destructive bg-secondary-cute-crab size-6 cursor-pointer
											rounded-full p-1"
									>
										<FaRegTrashCan className="group-hover:text-primary-white size-full transition-all" />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Do you wish to remove all items in your cart?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This will remove all items in your cart. Do you wish to
											proceed?
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel className="cursor-pointer">
											No, keep them
										</AlertDialogCancel>
										<AlertDialogAction asChild>
											<Button
												variant="destructive"
												className="text-primary-white hover:bg-destructive bg-secondary-cute-crab cursor-pointer"
												onClick={handleClickRemoveAll}
											>
												Yes, remove them
											</Button>
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</TableHead>
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
							<TableRow key={item.product.id}>
								<TableCell>
									<Button
										variant="outline"
										size="icon"
										className="group hover:bg-secondary-cute-crab size-6 cursor-pointer rounded-full p-1"
										onClick={() => {
											handleClickRemove(item);
										}}
									>
										<X className="group-hover:text-primary-white size-full transition-all" />
									</Button>
								</TableCell>
								<TableCell className="flex flex-row items-center gap-5">
									<div className="bg-primary-white flex size-14 items-center justify-center rounded-md">
										<img
											src={item.product.images[0]}
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
											<Minus />
										</Button>
										<Input
											min={1}
											value={item.count === 0 ? "" : item.count}
											onChange={(e) => {
												handleInputChange(item.product, e.target.value);
											}}
											onBlur={(e) => {
												handleInputBlur(item.product, e.target.value);
											}}
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
											<Plus />
										</Button>
									</div>
								</TableCell>
								<TableCell className="min-w-28 text-center">
									<p>
										$
										{roundNumberByDecimalPlace(
											item.count * item.product.price,
											2,
										)}
									</p>
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
};
