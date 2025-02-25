import { cn } from "../utils/cn";

type ErrorDisplayProps = {
	children: React.ReactNode;
	className?: string;
};

const ErrorDisplay = ({ children, className, ...props }: ErrorDisplayProps) => {
	return (
		<div
			className={cn(
				"p-4 border-2 border-r-secondary-cute-crab shadow-md text-secondary-cute-crab font-inter font-semibold text-lg text-center",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default ErrorDisplay;
