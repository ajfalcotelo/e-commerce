import { ImageCarousel } from "@/components/ImageCarousel";
import { Categories } from "@/components/Categories";
import { ShopSection } from "@/components/ShopSection";
import { CardCarouselSection } from "@/components/CardCarouselSection";
import { ProductCard } from "@/components/ProductCard";
import { useProductContext } from "@/hooks/useProductContext";
import { FaRegEye } from "react-icons/fa6";
import { WishlistCardAction } from "@/components/WishlistCardAction";
import { ProductType } from "@/context/ProductContext";

const CarouselCardAction = (product: ProductType) => (
	<>
		<WishlistCardAction product={product} />
		<button
			className="bg-secondary-white-smoke flex size-8 cursor-pointer appearance-none items-center
				justify-center rounded-full"
		>
			<FaRegEye />
		</button>
	</>
);

export const Shop = () => {
	const { products } = useProductContext();
	const discountedProducts = products.filter((product) => product.discountRate);

	return (
		<div className="mx-[16vw]">
			<div className="grid grid-cols-[14rem_1fr]">
				<Categories className="border-r border-black/30 pt-10 pr-4" />
				<ImageCarousel className="mt-10 ml-11 h-80" />
			</div>

			{/* ShopSections with colored line between gap */}
			<div className="mt-16 divide-y divide-black/30">
				<CardCarouselSection
					title="Discounted Sales"
					tag="Today's"
					viewAllBtn
					viewAllCategory="Discounted Sales"
					options={{ watchDrag: false }}
					dataSet={discountedProducts}
					rows={1}
					renderData={(data) => (
						<ProductCard
							product={data}
							key={data._id}
							actionButtons={CarouselCardAction(data)}
						/>
					)}
				/>
				<ShopSection title="Section Testing 2" tag="Tomorrow's">
					Test
				</ShopSection>
				<CardCarouselSection
					title="Explore Our Products"
					tag="Our Products"
					viewAllBtn
					viewAllCategory="Products"
					dataSet={products}
					rows={2}
					renderData={(data) => (
						<ProductCard
							product={data}
							key={data._id}
							actionButtons={CarouselCardAction(data)}
						/>
					)}
				/>
			</div>
		</div>
	);
};
