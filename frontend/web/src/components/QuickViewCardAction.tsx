import { CardActionButton } from "@/components/ui/CardActionButton";
import { Products } from "@/types";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router";

export const QuickViewCardAction = ({ product }: { product: Products }) => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		const slug = product.title
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
		navigate(`/products/${slug}-i${product.id}`);
		scrollTo(0, 0);
		console.log("test");
	};

	return (
		<CardActionButton onClick={handleOnClick}>
			<FaRegEye />
		</CardActionButton>
	);
};
