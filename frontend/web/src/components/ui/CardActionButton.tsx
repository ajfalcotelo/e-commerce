import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type CardActionButtonType = {
	className?: string;
	children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CardActionButton = ({
	className,
	children,
	...props
}: CardActionButtonType) => {
	return (
		<button
			className={cn(
				`bg-secondary-white-smoke flex size-8 cursor-pointer appearance-none items-center
				justify-center rounded-full`,
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
