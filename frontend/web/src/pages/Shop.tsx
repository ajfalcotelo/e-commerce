import { ImageCarousel } from "@/components/ImageCarousel";
import { Categories } from "@/components/Categories";
import { CardCarouselSection } from "@/components/CardCarouselSection";
import { ProductCard } from "@/components/ProductCard";
import { WishlistCardAction } from "@/components/WishlistCardAction";
import { QuickViewCardAction } from "@/components/QuickViewCardAction";
import { Products } from "@/types";
import { fetchProductBaseUrl } from "@/utils/api";
import { useEffect, useState } from "react";

const CarouselCardAction = (product: Products) => (
	<>
		<WishlistCardAction product={product} />
		<QuickViewCardAction product={product} />
	</>
);

export const Shop = () => {
	const [products, setProducts] = useState<Products[]>([]);

	useEffect(() => {
		const getProducts = async () => {
			const data = await fetchProductBaseUrl<{ products: Products[] }>();
			const products = data.products;
			setProducts(products);
		};

		getProducts();
	}, []);

	const discountedProducts = products.filter(
		(product) => product.discountPercentage,
	);

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
							key={data.id}
							actionButtons={CarouselCardAction(data)}
						/>
					)}
				/>
				<CardCarouselSection
					title="Explore Our Products"
					tag="Our Products"
					viewAllBtn
					viewAllCategory="Products"
					options={{ watchDrag: false }}
					dataSet={products}
					rows={2}
					renderData={(data) => (
						<ProductCard
							product={data}
							key={data.id}
							actionButtons={CarouselCardAction(data)}
						/>
					)}
				/>
			</div>
		</div>
	);
};
