import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
	NextButton,
	PrevButton,
} from "@/components/ui/CarouselPrevNextButtons";
import { CardCarousel } from "@/components/CardCarousel";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

type viewAllButtonType =
	| {
			viewAllBtn: true;
			viewAllCategory: string;
	  }
	| {
			viewAllBtn: false;
			viewAllCategory: never;
	  };

type CardCarouselSectionProps<T> = {
	title: string;
	tag: string;
	className?: string;
	options?: EmblaOptionsType;
	dataSet: T[];
	rows: number;
	renderData: (data: T) => React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
	viewAllButtonType;

export const CardCarouselSection = <T,>({
	className,
	tag,
	title,
	viewAllBtn,
	viewAllCategory,
	options,
	dataSet,
	renderData,
	rows,
}: CardCarouselSectionProps<T>) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", ...options });
	const [isRendering, setIsRendering] = useState(true);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	useEffect(() => {
		requestAnimationFrame(() => setIsRendering(false));
	});

	return (
		<section className={cn("flex flex-col py-16 first:mt-16", className)}>
			<div
				className="border-l-secondary-cute-crab text-secondary-cute-crab mb-6 flex h-10
					items-center rounded-md border-l-[20px] pl-4 text-base font-semibold capitalize"
			>
				{tag}
			</div>
			<div className="mb-10 flex w-full flex-row justify-between">
				<p className="font-inter text-4xl font-semibold capitalize">{title}</p>
				<div className="grid grid-cols-2 items-center gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
			<div className="relative w-full">
				{isRendering ? (
					<div className="grid grid-cols-4 place-items-center gap-2">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="flex flex-col space-y-3">
								<Skeleton className="h-60 w-[270px] rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-6 w-[250px]" />
									<Skeleton className="h-6 w-[100px]" />
									<Skeleton className="h-6 w-[150px]" />
								</div>
							</div>
						))}
					</div>
				) : (
					<CardCarousel
						dataSet={dataSet}
						renderData={renderData}
						emblaRef={emblaRef}
						rows={rows}
					/>
				)}
			</div>
			{viewAllBtn && (
				<Button className="mx-auto mt-16 flex h-14 w-60 items-center justify-center capitalize">
					View All {viewAllCategory}
				</Button>
			)}
		</section>
	);
};
