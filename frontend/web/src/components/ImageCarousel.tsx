import { cn } from "@/lib/utils";

type ImageCarouselProps = {
	className?: string;
	children?: React.ReactNode;
};

export const ImageCarousel = ({
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
