import ImageCarousel from "../components/ImageCarousel";
import Categories from "../components/Categories";
import ShopSection from "../components/ShopSection";

const Shop = () => {
	return (
		<div className="mx-[16vw]">
			<div className="grid grid-cols-[14rem_1fr]">
				<Categories className="pt-10 pr-4 border-r border-border-grey" />
				<ImageCarousel className="mt-10 ml-11 h-80" />
			</div>

			{/* ShopSections with colored line between gap */}
			<div className="divide-y divide-border-grey">
				<ShopSection
					title="Section Testing"
					tag="Today's"
					navMode="horizontal"
					viewAllBtn
					viewAllCategory="Eletronics"
				>
					Test
				</ShopSection>
				<ShopSection title="Section Testing 2" tag="Tomorrow's" navMode="all">
					Test
				</ShopSection>
				<ShopSection
					title="Section Testing 3"
					tag="Yesterday's"
					navMode="horizontal"
				>
					Test
				</ShopSection>
			</div>
		</div>
	);
};

export default Shop;
