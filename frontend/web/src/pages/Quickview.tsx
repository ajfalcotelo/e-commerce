import { ImageSlider } from "@/components/ImageSlider";
import { LinkButton } from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { StarRating } from "@/components/ui/StarRating";
import { NotFound } from "@/pages/NotFound";
import { Products } from "@/types";
import { fetchProductBaseUrl } from "@/utils/api";
import { ROUTES } from "@/utils/constant";
import { Minus, Plus, RefreshCcw, ShoppingCart, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { useParams } from "react-router";

export const Quickview = () => {
	const { slugId } = useParams();
	const [product, setProduct] = useState<Products | undefined>(undefined);
	const [notFound, setNotFound] = useState(false);
	const [count, setCount] = useState(1);
	const [isRendering, setIsRendering] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const handleInputChange = (value: string) => {
		const regex = /[^0-9]+/g;
		const newValue = value.replace(regex, "");
		const newCount = Number(newValue);
		if (newValue === "") {
			setCount(0);
		} else {
			setCount(newCount);
		}
	};

	const handleInputBlur = (value: string) => {
		if (!product) return;
		const regex = /[\D]+/g;
		const newCount = Math.max(1, Number(value.replace(regex, "")));
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
	};

	const handleClickIncrement = () => {
		if (!product) return;
		const newCount = count + 1;
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
	};

	const handleClickDecrement = () => {
		if (!product) return;
		const newCount = Math.max(1, count - 1);
		if (product.stock < newCount) {
			setCount(product.stock);
		} else {
			setCount(newCount);
		}
	};

	useEffect(() => {
		const match = slugId?.match(/(.+)-i([a-fA-F0-9]{24})$/);
		if (!match) {
			console.log("no match");
			setNotFound(true);
			return;
		}
		const id = match[2];

		const getProduct = async () => {
			setIsLoading(true);
			const data = await fetchProductBaseUrl<Products>(`/${id}`);
			if (!data) {
				console.log("no product");
				setNotFound(true);
				return;
			}
			setIsLoading(false);
			setProduct(data);
		};

		getProduct();
	}, [slugId]);

	useEffect(() => {
		requestAnimationFrame(() => setIsRendering(false));
	});

	if (!isLoading) {
		return (
			<div className="flex min-h-[600px] min-w-[700px] flex-row gap-8">
				<div className="flex flex-col gap-4">
					{[...Array(4)].map((_, i) => {
						return (
							<Skeleton
								className="bg-primary-white flex size-36 cursor-pointer items-center justify-center
									rounded-md p-4"
								key={i}
							/>
						);
					})}
				</div>
				<Skeleton className="bg-primary-white flex size-[600px] items-center justify-center rounded-md p-6" />
			</div>
		);
	} else if (notFound) return <NotFound />;

	return (
		<div className="mx-[16vw]">
			{product && (
				<div className="bg-secondary-white-smoke grid grid-flow-col gap-18 p-8">
					{isRendering ? (
						<div className="flex min-h-[600px] min-w-[700px] flex-row gap-8">
							<div className="flex flex-col gap-4">
								{[...Array(4)].map((_, i) => {
									return (
										<Skeleton
											className="bg-primary-white flex size-36 cursor-pointer items-center justify-center
												rounded-md p-3"
											key={i}
										/>
									);
								})}
							</div>
							<Skeleton className="bg-primary-white flex size-[624px] items-center justify-center rounded-md p-6" />
						</div>
					) : (
						<ImageSlider product={product} className="grow" />
					)}

					<div className="bg-primary-white flex flex-col rounded-md p-4">
						<div className="mb-6 border-b border-b-black/30 pb-6">
							<div className="mb-6 flex flex-col gap-4">
								<h2 className="text-2xl font-semibold">{product.title}</h2>
								<div className="divide-battle-grey flex flex-row items-center divide-x-2">
									<div className="flex flex-row items-center gap-2 pr-4">
										<StarRating rate={product.rating} className="size-4" />
										<p className="text-battle-grey text-sm">
											({Math.floor(Math.random() * 300)})
										</p>
									</div>
									<p className="pl-4 text-sm">
										{product.stock > 0 ? (
											<span className="text-buster-green">In Stock</span>
										) : (
											<span className="text-secondary-cute-crab">
												Out of Stock
											</span>
										)}
									</p>
								</div>
								<h3 className="text-2xl">${product.price}</h3>
							</div>
							<p className="text-sm">{product.description}</p>
						</div>
						<div className="mb-6 flex flex-col gap-1">
							<p>Quantity</p>
							<div className="flex flex-row items-center">
								<Button
									onClick={() => {
										handleClickDecrement();
									}}
									variant="outline"
									size="icon"
									className="rounded-r-none border-r-0"
								>
									<Minus />
								</Button>
								<Input
									min={1}
									value={count === 0 ? "" : count}
									onChange={(e) => {
										handleInputChange(e.target.value);
									}}
									onBlur={(e) => {
										handleInputBlur(e.target.value);
									}}
									className="bg-primary-white z-10 w-20 rounded-none"
								/>
								<Button
									onClick={() => {
										handleClickIncrement();
									}}
									variant="outline"
									size="icon"
									className="rounded-l-none border-l-0"
								>
									<Plus />
								</Button>
							</div>
						</div>
						<div className="mb-10 flex w-10/12 flex-row justify-start gap-4">
							<LinkButton
								route={ROUTES.HOME.CHECKOUT}
								className="flex grow items-center justify-center px-4 py-1 font-medium"
							>
								Buy Now
							</LinkButton>
							<Button variant="outline" size="icon" className="cursor-pointer">
								<FaRegHeart />
							</Button>
							<Button variant="outline" size="icon" className="cursor-pointer">
								<ShoppingCart />
							</Button>
						</div>
						<div className="grid grid-flow-row divide-y divide-black/30 border border-black/30">
							<div className="flex items-center gap-4 p-4">
								<Truck />
								<div className="space-y-2">
									<p className="font-medium">Free Delivery</p>
									<p className="text-xs font-medium">
										Enter your postal code for Delivery Availability
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4 p-4">
								<RefreshCcw />
								<div className="space-y-2">
									<p className="font-medium">Return Delivery</p>
									<p className="text-xs font-medium">
										Free 30 days Delivery Returns
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
