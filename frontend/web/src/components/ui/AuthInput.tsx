import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type AuthInputProps = {
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const AuthInput = ({ className, ...props }: AuthInputProps) => {
	return (
		<input
			className={cn(
				"box-border h-9 border-b border-b-black py-2 border-opacity-50 text-primary-black focus:outline-none focus:border-b-2 placeholder:text-black placeholder:text-opacity-40 ",
				className
			)}
			{...props}
		/>
	);
};
