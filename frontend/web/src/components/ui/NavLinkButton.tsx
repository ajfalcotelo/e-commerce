import { NavLink } from "react-router";
import { cn } from "../../utils/cn";
import { VariantProps } from "class-variance-authority";
import buttonVariants from "../../utils/buttonVariants";

type NavLinkButtonProps = {
	children: React.ReactNode;
	route: string;
	className?: string;
} & VariantProps<typeof buttonVariants>;

const NavLinkButton = ({
	children,
	route,
	variant,
	className,
	...props
}: NavLinkButtonProps) => {
	return (
		<NavLink
			to={route}
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		>
			{children}
		</NavLink>
	);
};

export default NavLinkButton;
