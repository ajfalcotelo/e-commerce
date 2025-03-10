import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/utils/buttonVariants";

type NavLinkButtonProps = {
	children: React.ReactNode;
	route: string;
	className?: string;
} & VariantProps<typeof buttonVariants>;

export const LinkButton = ({
	children,
	route,
	variant,
	className,
	...props
}: NavLinkButtonProps) => {
	return (
		<Link
			to={route}
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		>
			{children}
		</Link>
	);
};
