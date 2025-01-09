import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type AuthInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const AuthInput = ({ className, ...props }: AuthInputProps) => {
  return (
    <input
      className={cn(
        'bg-transparent text-primary-black border-b border-black py-2 border-opacity-50 focus:outline-none focus:border-b-2 placeholder:text-black placeholder:text-opacity-40 ',
        className
      )}
      {...props}
    />
  );
};
