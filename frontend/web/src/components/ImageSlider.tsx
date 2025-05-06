import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ProductType } from "@/context/ProductContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ImageSliderType = {
	product: ProductType;
	className?: string;
};

export const ImageSlider = ({ product, className }: ImageSliderType) => {
	const [activeImgSrc, setActiveImgSrc] = useState(product.image[0]);
	const [tempImgSrc, setTempImgSrc] = useState<string | undefined>();

	console.log(product.image.length);

	return (
		<div
			className={cn(
				"flex min-h-[600px] min-w-[700px] flex-row gap-8",
				className,
			)}
		>
			<ScrollArea>
				<div className="flex flex-col gap-4 overflow-auto">
					{product.image.map((el, id) => {
						return (
							<div
								className={cn(
									`bg-primary-white flex size-36 cursor-pointer items-center justify-center
									rounded-md p-3`,
									{
										"border-candy-pink border":
											el === tempImgSrc || el === activeImgSrc,
									},
								)}
								key={id}
								onMouseEnter={() => {
									setTempImgSrc(el);
								}}
								onMouseLeave={() => {
									setTempImgSrc(undefined);
								}}
								onClick={() => {
									setActiveImgSrc(el);
								}}
							>
								<img src={el} className="max-h-11/12 max-w-11/12" />
							</div>
						);
					})}
				</div>
			</ScrollArea>
			<div className="bg-primary-white flex size-[624px] items-center justify-center rounded-md p-6">
				<img
					src={tempImgSrc ? tempImgSrc : activeImgSrc}
					className="max-h-11/12 max-w-11/12"
				/>
			</div>
		</div>
	);
};
