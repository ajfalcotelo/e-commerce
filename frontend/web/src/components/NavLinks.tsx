type NavLinkProps = {
    href: string,
    children: React.ReactNode
};

export const NavLink = ({ href, children }: NavLinkProps) => {
    return (
        <a href={`${href}`} className="inline-flex items-center text-center">{children}</a>
    )
}