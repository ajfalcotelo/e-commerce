import { cn } from "@/lib/utils";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

type StarRatingProps = {
	rate: number;
	className?: string;
};

export const StarRating: React.FC<StarRatingProps> = ({ rate, className }) => {
	const stars = [];

	for (let i = 1; i <= 5; i++) {
		if (rate >= i) {
			// Full Star
			stars.push(<FaStar key={i} className={cn("text-gold", className)} />);
		} else if (rate >= i - 0.5) {
			// Half Star
			stars.push(
				<FaStarHalfStroke key={i} className={cn("text-gold", className)} />,
			);
		} else {
			// Empty Star
			stars.push(<FaRegStar key={i} className={cn("text-gold", className)} />);
		}
	}

	return <div className="flex space-x-1">{stars}</div>;
};
