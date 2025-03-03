import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/utils/buttonVariants";

type ButtonProps = {
	className?: string;
	children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

export const Button = ({
	className,
	children,
	variant,
	...props
}: ButtonProps) => {
	return (
		<button className={cn(buttonVariants({ variant }), className)} {...props}>
			{children}
		</button>
	);
};
