import { CardActionButton } from "@/components/ui/CardActionButton";
import { ProductType } from "@/context/ProductContext";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router";

export const QuickViewCardAction = ({ product }: { product: ProductType }) => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		const slug = product.title
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
		navigate(`/products/${slug}-i${product._id}`);
		scrollTo(0, 0);
		console.log("test");
	};

	return (
		<CardActionButton onClick={handleOnClick}>
			<FaRegEye />
		</CardActionButton>
	);
};
