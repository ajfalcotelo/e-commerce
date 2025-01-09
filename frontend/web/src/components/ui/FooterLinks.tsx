type FooterLinksProps = {
  children: React.ReactNode;
  route: string;
};
export const FooterLinks = ({ children, route }: FooterLinksProps) => {
  return (
    <a href={route} className="transition-all hover:underline">
      {children}
    </a>
  );
};
