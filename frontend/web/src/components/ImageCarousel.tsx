import { cn } from "../utils/cn";

type ImageCarouselProps = {
	className?: string;
	children?: React.ReactNode;
};

const ImageCarousel = ({
	className,
	children,
	...props
}: ImageCarouselProps) => {
	return (
		<div className={cn("bg-primary-black", className)} {...props}>
			{children}
		</div>
	);
};

export default ImageCarousel;
