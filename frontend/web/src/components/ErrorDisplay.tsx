import { cn } from "@/lib/utils";

type ErrorDisplayProps = {
	children: React.ReactNode;
	className?: string;
};

export const ErrorDisplay = ({
	children,
	className,
	...props
}: ErrorDisplayProps) => {
	return (
		<div
			className={cn(
				`border-secondary-cute-crab text-secondary-cute-crab font-inter border-2 p-4
				text-center text-lg font-semibold shadow-[0_0_8px_-1px] shadow-black/30
				select-none`,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
