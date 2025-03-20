import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { isValidElement } from "react";

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
	title: string | React.ReactElement;
	tag?: string;
	className?: string;
	children: React.ReactNode;
	actionButton?: React.ReactElement;
} & viewAllButtonType;

export const ShopSection = ({
	className,
	children,
	tag,
	title,
	actionButton,
	viewAllBtn,
	viewAllCategory,
}: ShopSectionProps) => {
	return (
		<div className={cn("flex flex-col py-16", className)}>
			{tag && (
				<div
					className="border-l-secondary-cute-crab text-secondary-cute-crab mb-6 flex h-10
						items-center rounded-md border-l-[20px] pl-4 text-base font-semibold capitalize"
				>
					{tag}
				</div>
			)}
			<div className="mb-10 flex w-full flex-row items-center justify-between">
				{isValidElement(title) ? (
					title
				) : (
					<p className="font-inter text-4xl font-semibold">{title}</p>
				)}
				{actionButton}
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
