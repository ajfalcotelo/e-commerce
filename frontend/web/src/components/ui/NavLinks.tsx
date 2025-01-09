import { AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type NavLinkProps = {
  route: string;
  className?: string;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NavLink = ({
  route,
  className,
  children,
  ...props
}: NavLinkProps) => {
  const isActive = window.location.pathname === route;
  return (
    <a
      href={route}
      className={cn(
        'text-sm font-medium inline-flex items-center text-center py-1',
        isActive ? 'border-b-2 border-black border-opacity-50' : '',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
