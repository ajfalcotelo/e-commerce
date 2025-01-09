import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva('p-4 font-medium rounded-md  transition-all', {
  variants: {
    variant: {
      red: 'bg-secondary-cute-crab text-primary-white border-none hover:bg-candy-pink',
      white:
        'bg-primary-white border-2 border-black border-opacity-40 drop-shadow-xl hover:text-battle-grey',
    },
  },
  defaultVariants: {
    variant: 'red',
  },
});

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
