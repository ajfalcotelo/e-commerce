import { ArrowLeft, ArrowRight } from "lucide-react";
import { ComponentPropsWithRef } from "react";

type CarouselButtonProps = ComponentPropsWithRef<"button">;

const CarouselButton = (props: CarouselButtonProps) => {
	const { children, ...restProps } = props;

	return (
		<button
			className="bg-secondary-white-smoke group z-10 m-0 flex size-11 cursor-pointer
				appearance-none items-center justify-center rounded-full border-0 p-0
				shadow-[inset_0_0_0.3rem_0.1rem_rgb(234,234,234)] disabled:cursor-default"
			type="button"
			{...restProps}
		>
			{children}
		</button>
	);
};

export const PrevButton: React.FC<CarouselButtonProps> = (props) => {
	return (
		<CarouselButton {...props}>
			<ArrowLeft className="size-5 group-disabled:text-[rgb(192,192,192)]" />
		</CarouselButton>
	);
};

export const NextButton: React.FC<CarouselButtonProps> = (props) => {
	return (
		<CarouselButton {...props}>
			<ArrowRight className="size-5 group-disabled:text-[rgb(192,192,192)]" />
		</CarouselButton>
	);
};
