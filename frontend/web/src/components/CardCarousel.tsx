import { ForwardedRef } from "react";

export type CardCarouselProps<T> = {
	data: T[];
	emblaRef: ForwardedRef<HTMLDivElement>;
	renderItem: (item: T) => React.ReactNode;
};

export const CardCarousel = <T,>({
	data,
	renderItem,
	emblaRef,
}: CardCarouselProps<T>) => {
	return (
		<div className="w-full overflow-hidden p-2" ref={emblaRef}>
			<div className="flex gap-4">{data.map((item) => renderItem(item))}</div>
		</div>
	);
};
