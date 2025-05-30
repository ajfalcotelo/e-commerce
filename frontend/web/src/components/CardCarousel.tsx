import { PRODUCT_CARD_WIDTH } from "@/components/ProductCard";
import {
	ForwardedRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export type CardCarouselProps<T> = {
	dataSet: T[];
	emblaRef: ForwardedRef<HTMLDivElement>;
	renderData: (data: T) => React.ReactNode;
	rows: number;
};

export const CardCarousel = <T,>({
	dataSet,
	renderData,
	emblaRef,
	rows,
}: CardCarouselProps<T>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dataPerRow, setDataPerRow] = useState(4);

	const dataSlides = useMemo(
		() => Math.ceil(dataSet.length / (dataPerRow * rows)),
		[dataPerRow, dataSet.length, rows],
	);

	const updateDataPerRow = useCallback(() => {
		if (!containerRef.current) return;
		const containerWidth = containerRef.current.clientWidth;

		if (!containerWidth) return;
		const itemsThatFit = Math.max(
			1,
			Math.floor(containerWidth / PRODUCT_CARD_WIDTH),
		);
		setDataPerRow(itemsThatFit);
	}, []);

	useEffect(() => {
		const handleResize = () => requestAnimationFrame(updateDataPerRow);
		updateDataPerRow();
		const resizeObserver = new ResizeObserver(handleResize);
		if (containerRef.current) resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect(); // Cleanup observer on unmount
	}, [updateDataPerRow]);

	const combinedRef = useCallback(
		(el: HTMLDivElement | null) => {
			if (typeof emblaRef === "function") emblaRef(el);
			else if (emblaRef && "current" in emblaRef)
				(emblaRef as React.MutableRefObject<HTMLDivElement | null>).current =
					el;

			(containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
				el;
		},
		[emblaRef],
	);

	return (
		<div
			className="w-full overflow-hidden p-0.5"
			ref={(el) => {
				combinedRef(el);
			}}
		>
			<div className="flex">
				{Array.from({ length: dataSlides }).map((_, i) => {
					const slicedData = dataSet.slice(
						i * dataPerRow * rows,
						i * dataPerRow * rows + dataPerRow * rows,
					);
					return (
						<div
							key={i}
							className="grid w-full shrink-0 grow-0 basis-full grid-flow-row auto-rows-min
								justify-center gap-4"
						>
							{Array.from({ length: rows }).map((_, i) => {
								const dicedData = slicedData.slice(
									i * dataPerRow,
									i * dataPerRow + dataPerRow,
								);
								return (
									<div
										className="grid auto-cols-min grid-flow-col gap-4"
										key={i}
									>
										{dicedData.map((item) => renderData(item))}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
