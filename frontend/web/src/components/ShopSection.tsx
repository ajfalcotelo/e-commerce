import { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { Button } from "./ui/Button";

type viewAllButtonType =
	| {
			viewAllBtn: true;
			viewAllCategory: string;
	  }
	| {
			viewAllBtn?: false;
			viewAllCategory?: string;
	  };

type ShopSectionProps = {
	title: string;
	tag: string;
	navMode: "horizontal" | "all" | "none";
	className?: string;
	children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
	viewAllButtonType;

const navModeRender = (navModeSetting: string) => {
	switch (navModeSetting) {
		case "horizontal":
			return (
				<div className="flex flex-row gap-3">
					<button
						type="button"
						className="flex justify-center items-center rounded-full bg-secondary-white-smoke size-11"
					>
						<img src="/icons_arrow-left.svg" />
					</button>
					<button
						type="button"
						className="flex justify-center items-center rounded-full bg-secondary-white-smoke size-11"
					>
						<img src="/icons_arrow-right.svg" />
					</button>
				</div>
			);
		case "all":
			return (
				<Button
					className="flex flex-row w-40 h-full items-center justify-center"
					variant={"red"}
				>
					View All
				</Button>
			);
		case "none":
		default:
			return;
	}
};

const ShopSection = ({
	className,
	children,
	tag,
	title,
	navMode,
	viewAllBtn,
	viewAllCategory,
}: ShopSectionProps) => {
	return (
		<div className={cn("flex flex-col py-16 first:mt-16", className)}>
			<div className="flex items-center h-10 pl-4 mb-6 border-l-[20px] border-l-secondary-cute-crab rounded-md text-secondary-cute-crab text-base font-semibold capitalize">
				{tag}
			</div>
			<div className="flex flex-row justify-between w-full mb-10">
				<p className="text-4xl font-inter font-semibold">{title}</p>
				{navModeRender(navMode)}
			</div>
			{children}
			{viewAllBtn && (
				<Button className="flex items-center justify-center w-60 h-14 mx-auto mt-16">
					View All {viewAllCategory}
				</Button>
			)}
		</div>
	);
};

export default ShopSection;
