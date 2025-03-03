import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type AuthInputProps = {
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const AuthInput = ({ className, ...props }: AuthInputProps) => {
	return (
		<input
			className={cn(
				"text-primary-black box-border h-9 border-b border-b-black/50 py-2 placeholder:text-black/70 focus:border-b-2 focus:outline-hidden",
				className,
			)}
			{...props}
		/>
	);
};
