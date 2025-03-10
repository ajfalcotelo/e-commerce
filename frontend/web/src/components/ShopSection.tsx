import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
						className="bg-secondary-white-smoke flex size-11 items-center justify-center rounded-full"
					>
						<img src="/icons_arrow-left.svg" />
					</button>
					<button
						type="button"
						className="bg-secondary-white-smoke flex size-11 items-center justify-center rounded-full"
					>
						<img src="/icons_arrow-right.svg" />
					</button>
				</div>
			);
		case "all":
			return (
				<Button
					className="flex h-full w-40 flex-row items-center justify-center"
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

export const ShopSection = ({
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
			<div className="border-l-secondary-cute-crab text-secondary-cute-crab mb-6 flex h-10 items-center rounded-md border-l-[20px] pl-4 text-base font-semibold capitalize">
				{tag}
			</div>
			<div className="mb-10 flex w-full flex-row justify-between">
				<p className="font-inter text-4xl font-semibold">{title}</p>
				{navModeRender(navMode)}
			</div>
			{children}
			{viewAllBtn && (
				<Button className="mx-auto mt-16 flex h-14 w-60 items-center justify-center">
					View All {viewAllCategory}
				</Button>
			)}
		</div>
	);
};
