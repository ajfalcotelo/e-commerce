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
				"border-r-secondary-cute-crab text-secondary-cute-crab font-inter border-2 p-4 text-center text-lg font-semibold shadow-md",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
